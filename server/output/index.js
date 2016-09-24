'use strict'

const wired = require('./wired')

const outputStreams = {
  wired: require('./wired')
}

module.exports = class OutputManager {
  constructor () {
    this.streams = []
  }

  repipe (inputStream) {
    // to write
  }

  // add methods for configuring the output
}
