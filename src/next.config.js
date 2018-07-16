const path = require('path')
const withSass = require('@zeit/next-sass')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const DashboardPlugin = require('webpack-dashboard/plugin')
const { types } = require('./lib/types')
const klaw = require('klaw')
const _ = require('lodash')
const fs = require('fs-extra')
const { asResolver, hrefResolver, asResolverIndex, hrefResolverIndex } = require('./lib/link')

const { ANALYZE } = process.env

const getPrismicFiles = () => {
  return new Promise((resolve, reject) => {
    const items = []
    klaw('./pages/prismic')
      .on('error', reject)
      .on('data', item => {
        if (item.path.match(/\.json$/)) {
          items.push(item.path)
        }
      })
      .on('end', () => {
        resolve(items)
      })
  })
}

const processPrismicFiles = files => {
  return Promise.all(files.map(file => {
    return fs.readJson(file)
      .then(json => {
        const match = file.match(/\/([^\/]+)\/(item|page)\/([^\/]+)\.json$/)
        return {
          type: match[1],
          as: match[2],
          slug: match[3],
          path: file,
          data: json
        }
      })
  }))
// .then(files => {
//   return _.groupBy(files, 'data.type')
// })
}

const getPrismicMap = () => {
  return getPrismicFiles()
    .then(processPrismicFiles)
    .then(files => {
      const typesReversed = types.slice(0)
      typesReversed.reverse()
      const mapped = typesReversed.map(t => {
        const typeFiles = _.filter(files, file => file.type === t.type)
        const items = _.filter(typeFiles, file => file.as === 'item')
        const pages = _.filter(typeFiles, file => file.as === 'page')
        const mappedItems = _(items)
          .mapKeys(item => asResolver(item.data))
          .mapValues(item => hrefResolver(item.data))
          .value()
        const mappedPages = t.index
          ? _(pages)
            .mapKeys(item => asResolverIndex(t, parseInt(item.slug)))
            .mapValues(item => hrefResolverIndex(t, parseInt(item.slug)))
            .value()
          : {}
        return {...mappedPages, ...mappedItems}
      })
      return Object.assign.apply(null, [].concat(mapped))
    })
}

const getPageFiles = () => {
  return new Promise((resolve, reject) => {
    const items = []
    klaw('./pages')
      .on('error', reject)
      .on('data', item => {
        if (item.path.match(/\.js$/) && path.basename(item.path)[0] !== '_') {
          items.push(item.path)
        }
      })
      .on('end', () => {
        resolve(items)
      })
  })
}

const processPageFiles = files => {
  return files.map(file => {
    const match = file.match(/^\/app\/src\/pages\/(.*?)\.js$/)
    return {
      path: file,
      uri: `/${match[1].replace(/.*?(index)$/, '')}`
    }
  })
}

const getPageMap = () => {
  return getPageFiles()
    .then(processPageFiles)
    .then(files => {
      return _(files)
        .mapKeys(file => file.uri)
        .mapValues(file => file.uri)
        .value()
    })
}

module.exports = withSass({
  pageExtensions: ['js', 'jsx', 'json'],
  webpack: function (config, { dev, isServer, defaultLoaders }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerHost: '0.0.0.0',
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }
    // if (dev) {
    //   config.plugins.push(new DashboardPlugin())
    // }
    config.resolve.alias.components = path.resolve(__dirname, 'components')
    config.resolve.alias.lib = path.resolve(__dirname, 'lib')
    config.resolve.alias.css = path.resolve(__dirname, 'css')
    config.resolveLoader.modules.push(path.resolve(__dirname, 'loaders'))
    config.module.rules.push({
      test: /\.json$/,
      include: [ path.join(__dirname, 'pages/prismic') ],
      use: [
        defaultLoaders.babel,
        { loader: 'custom-loader' }
      ]
    })
    return config
  },
  exportPathMap() {
    return Promise.all([
      getPageMap(),
      getPrismicMap()
    ])
      .then((res) => {
        const mapped = _.mapValues(
          Object.assign.apply(null, res),
          path => ({page: path})
        )
        return mapped
      })
  }
})
