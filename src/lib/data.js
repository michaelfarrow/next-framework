const fs = require('fs-extra')
const { query, Prismic } = require('./prismic')
const path = require('path')
const _ = require('lodash')
const { types } = require('./types')
const crypto = require('crypto')
const download = require('download')
const klaw = require('klaw')

const ROOT_DIR = './pages/prismic'
const ROOT_DIR_IMG = './static/img/remote'
const DEFAULT_PER_PAGE = 100
const IMAGE_REGEX = /.*?\.(jpg|jpeg|svg|gif|png)$/

const promiseSerial = funcs => {
  return funcs.reduce(
    (promise, func) => {
      return promise.then(result => func().then(Array.prototype.concat.bind(result)))
    },
    Promise.resolve([])
  )
}

const hashUrl = url => {
  const ext = path.extname(url)
  const generator = crypto.createHash('sha1')
  generator.update(url)
  return `${generator.digest('hex')}${ext}`
}

const getPaginatedItemsPage = (type, page) => {
  const options = {page: page}
  options.pageSize = type.indexPerPage || DEFAULT_PER_PAGE
  // if (type.indexFields) options.fetch = type.indexFields
  if (type.indexOrder) options.orderings = `[${type.indexOrder}]`
  return query(api => api.query(
    Prismic.Predicates.at('document.type', type.type),
    options
  )).then(res => {
    if (!res || res.page >= res.next_page) {
      return res.results
    }
    return getPaginatedItemsPage(type, page + 1)
      .then((items) => res.results.concat(items))
  })
}

const getPaginatedItems = type => getPaginatedItemsPage(type, 1)

const savePaginatedData = type => items => {
  const paginated = type.index ? _.chunk(items, type.indexPerPage || DEFAULT_PER_PAGE) : [items]
  return Promise.all(paginated.map((items, i) => {
    return Promise.all(
      [
        fs.outputJson(
          path.resolve(ROOT_DIR, type.type, 'page', `${i + 1}.json`),
          {
            pagination: {
              current: i + 1,
              first: 1,
              last: paginated.length,
              next: i < paginated.length - 1 ? i + 2 : null,
              prev: i > 0 ? i : null
            },
            items: items.map(item => {
              if (!type.indexFields) return item
              return Object.assign({}, item, {
                data: _.pick(item.data, type.indexFields)
              })
            })
          },
          {spaces: 2}
        )
      ].concat(
        items.map(item => fs.outputJson(
          path.resolve(ROOT_DIR, type.type, 'item', `${item[type.key]}.json`),
          item,
          {spaces: 2}
        ))
      )
    )
  }))
}

const findImages = (o, images) => {
  if (_.isObject(o)) {
    Object.keys(o).forEach(key => {
      if (_.isString(o[key]) && o[key].match(IMAGE_REGEX)) {
        const hashedUrl = hashUrl(o[key])
        images.push({
          url: o[key],
          hash: hashedUrl
        })
        o[key] = hashedUrl
      } else {
        findImages(o[key], images)
      }
    })
  } else if (_.isArray(o)) {
    _.forEach(o, item => findImages(item, images))
  }
  return images
}

const parseImages = items => {
  return new Promise((resolve, reject) => {
    const images = items.map(item => findImages(item, []))
    resolve({
      items: items,
      images: _(images)
        .flatten(images)
        .uniqBy('hash')
        .value()
    })
  })
}

const downloadImages = images => {
  return promiseSerial(images.map(image => () => {
    return fs.pathExists(path.resolve(ROOT_DIR_IMG, image.hash))
      .then(exists => {
        console.log(`${exists ? 'Skipping' : 'Downloading'}: ${image.url}`)
        if(!exists) return download(image.url, ROOT_DIR_IMG, {filename: image.hash})
      })
  }))
}

const getImages = () => {
  return new Promise((resolve, reject) => {
    const items = []
    klaw(ROOT_DIR_IMG)
      .on('error', reject)
      .on('data', item => {
        if(item.path.match(IMAGE_REGEX)) {
          items.push(item.path)
        }
      })
      .on('end', () => resolve(items))
  })
}

const cleanupImages = images => {
  return getImages()
    .then(stored => {
      const _images = images.map(image => path.resolve(ROOT_DIR_IMG, image))
      return Promise.all(stored.map(image => {
        if(!_images.includes(image)) {
          console.log(`Deleting: ${image}`)
          return fs.remove(image)
        }
      }))
    })
}

module.exports.types = types

module.exports.fetch = () => {
  let imagesDownloaded = []

  return Promise.all([
    fs.emptyDir(ROOT_DIR),
    // fs.emptyDir(ROOT_DIR_IMG),
    fs.ensureDir(ROOT_DIR_IMG)
  ])
    .then(() => {
      return promiseSerial(types.map(t => () => {
        return getPaginatedItems(t)
          .then(parseImages)
          .then(({items, images}) => {
            const toDownload = images.filter(image => {
              return !imagesDownloaded.includes(image.hash)
            })
            imagesDownloaded = imagesDownloaded.concat(toDownload.map(image => image.hash))
            return downloadImages(toDownload)
              .then(() => items)
          })
          .then(savePaginatedData(t))
      })).then(() => {
        return cleanupImages(imagesDownloaded)
      })
    })
}
