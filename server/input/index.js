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

  pad (num) {
    if(num < 10) return "0" + num
    else return num
  }

  handleAdd (link, fn) {
    console.log("ADDED SOMETHING ***** ")
    console.dir(this.playing)
    console.dir(this.queue)
    let shouldStart = false
    if (this.queue.length == 0 && !this.playing) {
      shouldStart = true
    }

    youtube.infoFor(link, (err, result) => {
      const labels = result.items[0].snippet
      const duration = result.items[0].contentDetails.duration

      const nopt = duration.slice(2)

      const splitByM = nopt.split('M')
      let minutes = 0
      let seconds = 0
      let hours = 0
      if (splitByM.length > 1) {
        minutes = this.pad(nopt.split('M')[0])
        seconds = this.pad(nopt.split('M')[1].split('S')[0])
      } else {
        seconds = this.pad(nopt.split('S')[0])
      }

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
      console.log("NO MORE SONGS")
      return
    }

    try {
      console.log("POP ****")
      this.playing = this.queue.pop()
      console.dir(this.playing)

      this.currentStream = youtube.streamAudio(this.playing.id)

      this.setStream(this.currentStream) // pipe to output
      console.log("CURRENT STREAM SET ****")


      this.currentStream.on('data', (chunk) => {
        log(chunk)
        log(chunk.length)
      })
      this.currentStream.on('error', () => {
        log("END EVENT ERROR ****")
        this.playNext()
      })
      this.currentStream.on('close', () => {
        log(" EVENT CLOSE ****")
        this.playNext()
      })
      this.currentStream.on('end', () => {
        log(" EVENT END ****")
        this.playing = null

        //process.exit(0)
        this.playNext()
      })

    }
    catch (err) {
      log("OSDIJFOSIDJF")

    }
  
  }
}
