'use strict'

const log = require('debug')('r-fi:input')
const youtube = require('../youtube')

module.exports = class InputManager {
  constructor (stream) {
    this.queue = []
    this.setStream = stream 
    this.currentStream = null
    this.playing = null
  }

  handleAdd (link, fn) {
    let shouldStart = false
    if (this.queue.length == 0 && !this.playing) {
      shouldStart = true
    }

    youtube.infoFor(link, (err, result) => {
      const labels = result.items[0].snippet
      const duration = result.items[0].contentDetails.duration

      const nopt = duration.slice(2)
      const minutes = nopt.split('M')[0]
      const seconds = nopt.split('M')[1].split('S')[0]

      const video = {
        name: labels.title,
        duration: `${minutes}:${seconds}`,
        id: link
      }

      this.queue.push(video)
      if (shouldStart) {
        this.playNext()
      }

      return fn(null, {
        playing: this.playing,
        queue: this.queue
      })
    })

  }

  playNext () {
    console.log("AT BEGINNING OF PLAY NEXT")
    console.dir(this.queue)
    if (this.queue.length == 0) {
      return
    }


    this.playing = this.queue.pop()

    this.currentStream = youtube.streamAudio(this.playing.id)

    this.currentStream.on('end', () => {
      console.log("END EVENT EMITTED ****")
      this.playNext()
    })

    console.log("ending the stream *** ")

    this.setStream(this.currentStream)
  }
}
