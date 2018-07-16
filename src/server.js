const express = require('express')
const next = require('next')
const { parse } = require('url')
const fs = require('fs-extra')
const { types } = require('./lib/types')
const pathToRegexp = require('path-to-regexp')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev})
const handle = app.getRequestHandler()

const PAGES_DIR = './pages'

const matchRoute = path => {
  let matched = null
  types.forEach(t => {
    if (matched === null) {
      const indexWithPageRoute = t.index && `${t.index}/page/:page?` || null
      const indexRoute = t.index && `${t.index}` || null

      const indexWithPageRegex = indexWithPageRoute && pathToRegexp(indexWithPageRoute)
      const indexRegex = indexRoute && pathToRegexp(indexRoute)

      let match = null
      if (indexWithPageRegex && (match = indexWithPageRegex.exec(path))) {
        matched = Object.assign({}, t, {path: `page/${match[1]}`})
      } else if (indexRegex && (match = indexRegex.exec(path))) {
        matched = Object.assign({}, t, {path: `page/1`})
      } else if (match = t.routeRegex.exec(path)) {
        matched = Object.assign({}, t, {path: `item/${match[1]}`})
      }
    }
  })
  return matched
}

app.prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true)
      const pathName = parsedUrl.pathname

      const route = matchRoute(pathName)
      if (!route) return handle(req, res)

      const realUri = `/prismic/${route.type}/${route.path}`
      const jsonFilePath = `${PAGES_DIR}${realUri}.json`

      fs.pathExists(jsonFilePath)
        .then(exists => {
          if (exists) return app.render(req, res, realUri)
          return handle(req, res)
        })
    })

    server.listen(80, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:80')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
