'use strict'

const wired = require('./speakers/wired')
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

    this.endTimeout = null
  }

  // takes in audio stream
  repipe (inputStream) {

    // to write
    this.outputs.forEach((output) => {

      inputStream.on('data', (chunk) => {
        decoder.write(chunk)
      })

      console.time('drain')

      decoder
        .pipe(output.speaker) // pipe the input to output        


      output.speaker.on('drain', () => {
        if (this.endTimeout)
          clearTimeout(this.endTimeout)

        this.endTimeout = setTimeout(() => {
          log('Ending process')
          clearTimeout(this.endTimeout)
          process.exit()
        }, 500)
      })
    })

  }

  // add methods for configuring the output
}
