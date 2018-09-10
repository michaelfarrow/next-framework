const withSass = require('@zeit/next-sass')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = withSass({
  webpack: function (config, { isServer }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerHost: '0.0.0.0',
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }
    config.resolve.alias.components = path.resolve(__dirname, 'components')
    config.resolve.alias.lib = path.resolve(__dirname, 'lib')
    config.resolve.alias.css = path.resolve(__dirname, 'css')
    return config
  },
  exportPathMap: function (defaultPathMap) {
    return {
      '/': { page: '/' }
    }
  }
})
