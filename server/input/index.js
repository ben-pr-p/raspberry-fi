'use strict'

const log = require('debug')('r-fi:input')
const youtube = require('../youtube')
const cp = require('child_process')

module.exports = class InputManager {
  constructor (stream) {
    this.queue = []
    this.playing = null // name of whatever is playing
    this.paused = null
    this.child = cp.fork('./server/child/main.js')
  }

  pad (num) {
    if(num === "") return "00"
    else if(num < 10) return "0" + num.toString()
    else return num
  }

  skip (fn) {
    this.child.kill()
    console.log("SKIPPED. NOW PLAYING:")
    console.log(this.queue[0])
    return fn(null, {
      playing: this.queue[0],
      queue: this.queue.slice(1,this.queue.length)
    })
  }

  delete(name, fn) {

    const del = this.queue.filter((lnk) => lnk.name === name)[0] 

    this.queue.splice(this.queue.indexOf(del), 1)
    return fn(null, {
      playing: this.playing,
      queue: this.queue
    })
  }

  handleAdd (link, fn) {
    console.log("ADDED SOMETHING ***** ")
    console.dir(this.playing)
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
      log('%j added to queue', video)

      if (shouldStart) {
        this.playNext()
      }

      return fn(null, {
        playing: this.playing,
        queue: this.queue
      })
    })

  }

  closeChild (fn) {
    this.child.on('close', (code, signal) => {
      log('Child process killed...')
      this.child = null
      console.timeEnd('child')
      return fn(null)
    })

    this.child.kill()
  }

  playNext () {
    if (this.queue.length == 0) {
      console.log("NO MORE SONGS")
      return
    }

    this.playing = this.queue.shift()

    if (this.child) {
      this.spawn()
    } else {
      this.spawn()
    }
  }

  handlePause (cb) {
    if (this.child === null){
      log('trying to pause when there is nothing playing')
      cb("trying to pause when there is nothing playing")
    }

    this.child.send({message: 'pause'})

    cb(null)
  }

  resume (cb) {
    if (this.child === null){
      console.error("should be a child... but we can hack this if not")
      cb(null)
    }
    this.child.send({message: 'resume'})
    cb(null)
  }

  spawn () {
    console.time('child')
    if (!this.child) {
      this.child = cp.fork('./server/child/main.js')
    }
    this.child.send({message: 'song', data: this.playing})

    this.child.on('exit', (code, signal) => {
      log('Child process suicided...')
      this.child = null
      this.playing = null
      console.timeEnd('child')
      this.playNext()
    })
  }

  connectTo (address) {
    if (!this.child) {
      this.child = cp.fork('./server/child/main.js')
    }
    this.child.send({message: 'bluetooth-connect', data: address})
  }
}

