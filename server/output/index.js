'use strict'

const wired = require('./speakers/wired')
const bluetooth = require('./speakers/bluetooth')
const log = require('debug')('r-fi:output')

const lame = require('lame')
const decoder = lame.Decoder()

const outputStreams = {
  wired: wired
}

module.exports = class OutputManager {
  constructor () {
    const keys = Object.keys(outputStreams);
    this.outputs = keys.map((key) => outputStreams[key])

    this.started = false
    this.paused = false
    this.downloaded = false
    this.endTimeout = null

    this.chunkQueue = []
  }

  // takes in audio stream
  repipe (inputStream) {
    this.paused = false

    this.outputs.forEach((output) => {

      const writeNext = () => {
        const nextChunk = this.chunkQueue.shift()

        if (nextChunk)
          output.speaker.write(nextChunk)
        else
          this.started = false
      }

      const writeEmpty = () => {
        const empty = Buffer.from(new Array(4608).fill(0))
        output.speaker.write(empty)
      }

      inputStream.on('data', (chunk) => {
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
          log('Ending process')
          clearTimeout(this.endTimeout)
          if(!this.paused)
            process.exit()
        }, 500)

        if (this.paused) {
          return writeEmpty()
        } else {
          return writeNext()
        }
      })
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

