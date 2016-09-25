'use strict'

const log = require('debug')('r-fi:input')
const youtube = require('../youtube')

module.exports = class InputManager {
  constructor (setStream) {
    this.queue = []
    this.setStream = setStream
    this.currentStream = null
  }

  handleAdd (link) {
    let shouldStart = false
    if (this.queue.length == 0) {
      shouldStart = true
    }

    youtube.infoFor(link, (err, result) => {
      this.queue.push(link)
      if (shouldStart) {
        this.playNext()
      }
    })

  }

  playNext () {
    if (this.queue.length == 0) {
      return
    }

    this.currentStream = youtube.streamAudio(this.queue.pop())

    this.currentStream.on('end', () => {
      this.playNext()
    })

    this.setStream(this.currentStream)
  }
}
