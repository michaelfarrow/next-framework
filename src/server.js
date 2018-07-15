const express = require('express')
const next = require('next')
const { parse } = require('url')
const fs = require('fs-extra')
const types = require('./lib/types')
const pathToRegexp = require('path-to-regexp')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev})
const handle = app.getRequestHandler()

const PAGES_DIR = './pages'

const matchRoute = path => {
  let matched = null
  types.forEach(t => {
    if (matched === null) {
      if (t.index === path) {
        matched = Object.assign({}, t, {slug: 'index'})
      } else {
        const re = pathToRegexp(t.route)
        const match = re.exec(path)
        if (match) {
          matched = Object.assign({}, t, {slug: match[1]})
        }
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

      const realUri = `/prismic/${route.type}${route.slug !== 'index' && `/${route.slug}` || ''}`
      const jsonFilePath = `${PAGES_DIR}/prismic/${route.type}/${route.slug}.json`

      // console.log('----')
      // console.log(pathName)
      // console.log(realUri)
      // console.log(jsonFilePath)

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
