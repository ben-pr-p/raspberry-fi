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
    this.paused = false
    this.endTimeout = null
  }

  // takes in audio stream
  repipe (inputStream) {
    this.paused = false
    // to write
    this.outputs.forEach((output) => {

      inputStream.on('data', (chunk) => {
        console.log("input chunk")
        decoder.write(chunk)
      })

      console.time('drain')

      // decoder.on('data', (chunk) => {
      //   if(!this.paused){
      //     console.log(chunk)
      //     output.speaker.write(chunk)
      //   } else {
      //     console.log("preventing write")
      //   }
      // })   
      decoder.pipe(output.speaker)   

      output.speaker.on('drain', () => {
        console.log("DRAINING")
        console.log(this.paused)
        if (this.endTimeout)
          clearTimeout(this.endTimeout)

        this.endTimeout = setTimeout(() => {
          log('Ending process')
          clearTimeout(this.endTimeout)
          if(!this.paused)
            process.exit()
        }, 500)
      })
    })

  }

  pause () {
    console.log("PAUSE *** ")
    this.paused = true
    this.outputs.forEach((output) => {
      decoder.pause()
    })
  }

  resume() {
    this.paused = false
    this.outputs.forEach((output) => {
      decoder.resume()
    })
  }

  // add methods for getting bluetooth 



}
