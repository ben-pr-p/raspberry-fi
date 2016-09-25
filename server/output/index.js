'use strict'

const wired = require('./wired')

const lame = require('lame')
const decoder = lame.Decoder()

const outputStreams = {
  wired: wired
}

module.exports = class OutputManager {
  constructor () {
    const keys = Object.keys(outputStreams);
    this.outputs = keys.map((key) => outputStreams[key])
  }

  // takes in audio stream
  repipe (inputStream) {
    // to write
    this.outputs.forEach((output) => {
        inputStream
          .pipe(decoder)
          .pipe(output) // pipe the input to output
    })
  }


  // add methods for configuring the output
}
