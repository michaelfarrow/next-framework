const Prismic = require('prismic-javascript')
const { repo } = require('../config')

const API_ENDPOINT = `http://${repo}.prismic.io/api/v2`

const api = () => Prismic.api(API_ENDPOINT)

module.exports.query = f => api().then(api => f(api))
module.exports.Prismic = Prismic
