'use strict'

const youtubeStream = require('youtube-audio-stream')

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

    this.queue.push(link)
    if (shouldStart) {
      this.playNext()
    }
  }

  playNext () {
    if (this.queue.length == 0) {
      return
    }

    this.currentStream = youtubeStream(this.queue.pop())

    this.currentStream.on('end', () => {
      this.playNext()
    })

    this.setStream(this.currentStream)
  }
}
