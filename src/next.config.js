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
    return config
  },
  exportPathMap: function (defaultPathMap) {
    return {
      '/': { page: '/' }
    }
  }
})
