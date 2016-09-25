'use strict'

const search = require('youtube-search')
const log = require('debug')('r-fi:youtube')
const youtubeStream = require('youtube-audio-stream')

const API_KEY = process.env.API_KEY
if (!API_KEY) {
  log('Missing youtube API_KEY - exiting...')
  process.exit()
}

const opts = {
  maxResults: 5,
  key: API_KEY
}

module.exports.search = function (value, fn) {
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

const Youtube = require('youtube-node');
const youtube = new Youtube();

youtube.setKey(API_KEY)

module.exports.infoFor = function (id, fn) {
  youtube.getById(id, (err, result) => {
    if (err) {
      log(JSON.stringify(err))
      return fn(err)
    }

    return fn(null, result)
  })
}

module.exports.streamAudio = function (link) {
  return youtubeStream(link)
}
