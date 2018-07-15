const pathToRegexp = require('path-to-regexp')

const types = [
  {
    type: 'project',
    key: 'uid',
    route: '/work/:uid',
    index: '/work',
    indexFields: [
      'project.title'
    ],
    indexOrder: 'my.project.title'
  },
  {
    type: 'page',
    key: 'uid',
    route: '/:uid'
  }
]

module.exports = types.map(t => {
  return Object.assign({}, t, {
    routeRegex: pathToRegexp(t.route),
    toPath: pathToRegexp.compile(t.route)
  })
})
