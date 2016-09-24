'use strict'

const search = require('youtube-search')
const log = require('debug')('r-fi:search')

const opts = {
  maxResults: 10,
  key: 'yourkey'
}

module.exports = function (value, fn) {
  search(value, opts, (err, results) => {
    return fn(err, results)
  })
}
