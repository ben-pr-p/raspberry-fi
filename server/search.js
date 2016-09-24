'use strict'

const search = require('youtube-search')
const log = require('debug')('r-fi:search')

const API_KEY = process.env.API_KEY
if (!API_KEY) {
  log('Missing youtube API_KEY - exiting...')
  process.exit()
}

const opts = {
  maxResults: 10,
  key: API_KEY
}

module.exports = function (value, fn) {
  search(value, opts, (err, results) => {
    if (err) {
      return fn(err)
    }

    return fn(null, results.map(r => processResult(r)))
  })
}

function processResult (res) {
  return {
    link: res.link, // https://youtube.com/watch?v=${id}
    title: res.title, // string
    description: res.description, // string
    thumbnail: res.thumbnails.default.url
  }
}
