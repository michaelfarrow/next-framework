const pathToRegexp = require('path-to-regexp')
const { mapKeys } = require('lodash')
const { types } = require('../config')

module.exports.types = types.map(t => {
  return Object.assign({}, t, {
    routeRegex: pathToRegexp(t.route),
    routeToPath: pathToRegexp.compile(t.route)
  })
})

module.exports.typesByKey = mapKeys(module.exports.types, t => t.type)
