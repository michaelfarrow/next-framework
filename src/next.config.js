const withSass = require('@zeit/next-sass')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')
const { ANALYZE } = process.env

module.exports = withSass({
  pageExtensions: ['js', 'jsx', 'svg'],
  webpack: function (config, { isServer, defaultLoaders }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerHost: '0.0.0.0',
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }
    config.resolve.alias.components = path.resolve(__dirname, 'components')
    config.resolveLoader.modules.push(path.resolve(__dirname, 'loaders'))
    config.module.rules.push({
      test: /\.svg/,
      include: [ path.join(__dirname, 'pages/diagrams') ],
      use: [
        defaultLoaders.babel,
        { loader: 'diagram-loader' }
      ]
    })
    return config
  },
  exportPathMap: function (defaultPathMap) {
    return {
      '/': { page: '/' }
    }
  }
})
