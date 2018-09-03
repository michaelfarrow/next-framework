const path = require('path')

const diagramTemplate = source => (`
import Diagram from 'components/diagram'
export default () => {
  const props = {
    content: ${JSON.stringify(source)}
  }
  return (
    <Diagram {...props} />
  )
}
`)

const render = (source, resourcePath) => new Promise((resolve, reject) => {
  resolve(diagramTemplate(source))
})

module.exports = function (source, map) {
  const done = this.async()

  this.addDependency(path.resolve('./components/page.js'))

  render(source, this.resourcePath)
    .catch(done).then(page => done(null, page))
}
