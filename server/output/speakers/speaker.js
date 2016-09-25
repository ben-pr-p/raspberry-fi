'use strict'

const Speaker = require('speaker')

module.exports = class SpeakerController {
  constructor() {
    this.opts = {
      channels: 2,          // 2 channels 
      bitDepth: 16,         // 16-bit samples 
      sampleRate: 44100     // 44,100 Hz sample rate 
    }
    this.speaker = new Speaker(this.opts)
  }

  resetSpeaker() {
    console.log("RESETTING SPEAKER **** ")
    this.speaker.close()
    this.speaker.end()
    console.log("****** after close")
    this.speaker = new Speaker(this.opts)
  }
} 