const Prismic = require('prismic-javascript')

const API_ENDPOINT = 'http://mikefarrow.prismic.io/api'

const api = () => Prismic.api(API_ENDPOINT)

module.exports.query = f => api().then(api => f(api))
module.exports.Prismic = Prismic
