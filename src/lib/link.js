const types = require('./types')
const { mapKeys } = require('lodash')

const TYPES = mapKeys(types, t => t.type)

const getType = doc => TYPES[doc.type] || null

module.exports.hrefResolver = doc => {
  const type = getType(doc)
  if (type) {
    return `/prismic/${type.type}/${doc[type.key]}`
  }
  return '#'
}

module.exports.asResolver = doc => {
  const type = getType(doc)
  if (type) {
    const pathArgs = {}
    pathArgs[type.key] = doc[type.key]
    return type.toPath(pathArgs)
  }
  return '#'
}
