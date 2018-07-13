const fs = require('fs-extra')
const { query, Prismic } = require('./prismic')
const path = require('path')
const _ = require('lodash')

const ROOT_DIR = './data'

const saveData = (dir, key) => res => {
  if (!res || !res.results || !res.results.length) throw new Error('Results not defined or length 0')
  return Promise.all(res.results.map(result => {
    const k = _.get(result, key)
    if (!k) throw new Error(`key "${key}" not defined on result`)
    return fs.outputJson(path.resolve(ROOT_DIR, dir, `${k}.json`), result, {spaces: 2})
  }))
}

const getPages = () => query(api => api.query(Prismic.Predicates.at('document.type', 'page')))

const fetch = () => {
  return Promise.all([
    getPages().then(saveData('pages', 'uid'))
  ])
}

fetch()
