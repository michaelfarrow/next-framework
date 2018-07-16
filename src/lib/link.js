const { typesByKey } = require('./types')

const getType = doc => typesByKey[doc.type] || null

module.exports.hrefResolver = doc => {
  const type = getType(doc)
  if (type) {
    return `/prismic/${type.type}/item/${doc[type.key]}`
  }
  return '#'
}

module.exports.asResolver = doc => {
  const type = getType(doc)
  if (type) {
    const pathArgs = {}
    pathArgs[type.key] = doc[type.key]
    return type.routeToPath(pathArgs)
  }
  return '#'
}

module.exports.asResolverIndex = (type, page) => {
  const path = [type.index]
  if (page !== 1) {
    path.push('page')
    path.push(page)
  }
  return path.join('/')
}

module.exports.hrefResolverIndex = (type, page) => {
  return ['/prismic', type.type, 'page', page].join('/')
}
