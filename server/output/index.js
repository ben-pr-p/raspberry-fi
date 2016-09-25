'use strict'

const wired = require('./speakers/wired')
const bluetooth = require('./speakers/bluetooth')
const log = require('debug')('r-fi:output')

const lame = require('lame')
const decoder = lame.Decoder()

const types = {
  bluetooth: require('./speakers/bluetooth'),
  wired: require('./speakers/wired')
}

module.exports = class OutputManager {
  constructor () {
    this.outputs = []

    this.started = false
    this.paused = false
    this.endTimeout = null

    this.chunkQueue = []

    this.currentInputStream = null
  }

  addOutput (type, params, fn) {
    types[type](params, (err, output) => {
      if (err) {
        log('Found error: %j', err)
      }

      log('Created output %j', output)
      this.outputs.push(output)
      this.configureOutput(output)
      return fn(null, output)
    })
  }

  // takes in audio stream
  repipe (inputStream) {
    this.currentInputStream = inputStream

    log('Repiping...')
    this.paused = false

    this.outputs.forEach((output) => {
      this.configureOutput(output)
    })
  }

  configureOutput (output) {
    log('Configuring %j', output)

    if (this.currentInputStream) {

      const writeNext = () => {
        const nextChunk = this.chunkQueue.shift()
        if (nextChunk) {
          this.writeToAll(nextChunk)
        } else {
          this.started = false
        }
      }

      const writeEmpty = () => {
        const empty = Buffer.from(new Array(4608).fill(0))
        this.writeToAll(empty)
      }

      this.currentInputStream.on('data', (chunk) => {
        decoder.write(chunk)
      })

      decoder.on('data', (chunk) => {
        this.chunkQueue.push(chunk)
        if (!this.started) {
          this.started = true
          writeNext()
        }
      })

      output.speaker.on('drain', () => {
        if (this.endTimeout) {
          clearTimeout(this.endTimeout)
        }

        this.endTimeout = setTimeout(() => {
          clearTimeout(this.endTimeout)
          if (!this.paused) {
            log('Ending process')
            process.exit()
          }
        }, 1000)

        if (this.paused) {
          return writeEmpty()
        } else {
          return writeNext()
        }
      })
    }

    else {
      return null
    }
  }

  writeToAll (chunk) {
    this.outputs.forEach(o => {
      o.speaker.write(chunk)
    })
  }

  pause () {
    log('Pausing...')
    this.paused = true
    this.outputs.forEach((output) => {
      decoder.pause()
    })
  }

  resume() {
    log('Resuming...')
    this.paused = false
    this.outputs.forEach((output) => {
      decoder.resume()
    })
  }
}

