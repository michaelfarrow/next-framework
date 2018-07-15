const fs = require('fs-extra')
const { query, Prismic } = require('./prismic')
const path = require('path')
const _ = require('lodash')
const types = require('./types')

const ROOT_DIR = './pages/prismic'

const saveData = (dir, key) => res => {
  if (!res || !res.results || !res.results.length) throw new Error('Results not defined or length 0')
  return Promise.all(res.results.map(result => {
    const k = _.get(result, key)
    if (!k) throw new Error(`key "${key}" not defined on result`)
    // const p = getPath(key, result, res.results)
    // result.path = p
    const p = k
    return fs.outputJson(path.resolve(ROOT_DIR, dir, `${p}.json`), result, {spaces: 2})
  }))
}

const getData = type => query(api => api.query(Prismic.Predicates.at('document.type', type)))

const getIndexData = type => {
  if (!type.index) return new Promise((resolve, reject) => resolve())
  const options = {}
  if (type.indexFields) options.fetch = type.indexFields
  if (type.indexOrder) options.orderings = `[${type.indexOrder}]`
  return query(api => api.query(
    Prismic.Predicates.at('document.type', type.type),
    options
  ))
}

const saveIndexData = dir => res => {
  if (!res) return
  return fs.outputJson(path.resolve(ROOT_DIR, dir, 'index.json'), {items: res.results}, {spaces: 2})
}

module.exports.types = types

module.exports.fetch = () => {
  return Promise.all([
    fs.emptyDir(ROOT_DIR)
  ].concat(
    types.map(t => getData(t.type).then(saveData(t.type, t.key))),
    types.map(t => getIndexData(t).then(saveIndexData(t.type)))
  ))
}
