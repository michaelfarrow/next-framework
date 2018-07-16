const path = require('path')

const typeTemplate = (props, type) => (`
import Type from 'components/type'
export default () => {
  const props = ${JSON.stringify(props, null, 2)}
  return (
    <Type type='${type}' {...props} />
  )
}
`)

const typeIndexTemplate = (props, type) => (`
import TypeIndex from 'components/type-index'
export default () => {
  const props = ${JSON.stringify(props, null, 2)}
  return (
    <TypeIndex type='${type}' {...props} />
  )
}
`)

const render = (source, resourcePath) => new Promise((resolve, reject) => {
  const matched = resourcePath.match(/pages\/prismic\/(.*?)\/(item|page)\/(.*?)\.json$/)
  const type = matched[1]
  const template = matched[2]
  const slug = matched[3]
  let json = null
  try {
    json = JSON.parse(source)
  } catch(err) {
    return reject(err)
  }
  resolve(template === 'page' ? typeIndexTemplate(json, type) : typeTemplate(json, type))
})

module.exports = function (source, map) {
  const done = this.async()

  this.addDependency(path.resolve('./components/page.js'))

  render(source, this.resourcePath)
    .catch(done).then(page => done(null, page))
}
