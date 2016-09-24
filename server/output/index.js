'use strict'

const wired = require('./wired')

const outputStreams = {
  wired: require('./wired')
}

module.exports = class OutputManager {
  constructor () {
    const keys = Object.keys(outputStreams);
    this.outputs = keys.map((key) => outputStreams[key])
    console.log(this.outputs)
  }

  // takes in audio stream
  repipe (inputStream) {
    // to write
    outputs.forEach((output) => {
        inputStream.pipe(output) // pipe the input to output
        //TODO: not a player 
       // output.play()
    })
  }




  // add methods for configuring the output
}
