const pathToRegexp = require('path-to-regexp')
const { mapKeys } = require('lodash')

const types = [
  {
    type: 'project',
    key: 'uid',
    route: '/work/:uid',
    index: '/work',
    indexFields: [
      'project.title'
    ],
    indexOrder: 'my.project.title',
    indexPerPage: 2
  },
  {
    type: 'page',
    key: 'uid',
    route: '/:uid'
  }
]

module.exports.types = types.map(t => {
  return Object.assign({}, t, {
    routeRegex: pathToRegexp(t.route),
    routeToPath: pathToRegexp.compile(t.route)
  })
})

module.exports.typesByKey = mapKeys(module.exports.types, t => t.type)
