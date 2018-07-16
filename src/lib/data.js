const fs = require('fs-extra')
const { query, Prismic } = require('./prismic')
const path = require('path')
const _ = require('lodash')
const { types } = require('./types')

const ROOT_DIR = './pages/prismic'
const DEFAULT_PER_PAGE = 100

const getPaginatedItemsPage = (type, page) => {
  const options = {page: page}
  options.pageSize = type.indexPerPage || DEFAULT_PER_PAGE
  if (type.indexFields) options.fetch = type.indexFields
  if (type.indexOrder) options.orderings = `[${type.indexOrder}]`
  return query(api => api.query(
    Prismic.Predicates.at('document.type', type.type),
    options
  )).then(res => {
    if (!res || res.page >= res.next_page) {
      return res.results
    }
    return getPaginatedItemsPage(type, page + 1)
      .then((items) => res.results.concat(items))
  })
}

const getPaginatedItems = type => getPaginatedItemsPage(type, 1)

const savePaginatedData = type => items => {
  const paginated = type.index ? _.chunk(items, type.indexPerPage || DEFAULT_PER_PAGE) : [items]
  return Promise.all(paginated.map((items, i) => {
    return Promise.all(
      [
        fs.outputJson(
          path.resolve(ROOT_DIR, type.type, 'page', `${i + 1}.json`),
          {
            pagination: {
              current: i + 1,
              first: 1,
              last: paginated.length,
              next: i < paginated.length - 1 ? i + 2 : null,
              prev: i > 0 ? i : null
            },
            items: items
          },
          {spaces: 2}
        )
      ].concat(
        items.map(item => fs.outputJson(
          path.resolve(ROOT_DIR, type.type, 'item', `${item[type.key]}.json`),
          item,
          {spaces: 2}
        ))
      )
    )
  }))
}

module.exports.types = types

module.exports.fetch = () => {
  return Promise.all([
    fs.emptyDir(ROOT_DIR)
  ].concat(
    types.map(t => getPaginatedItems(t).then(savePaginatedData(t))),
  // types.map(t => getData(t.type).then(saveData(t.type, t.key))),
  // types.map(t => getIndexData(t).then(saveIndexData(t.type)))
  ))
}
