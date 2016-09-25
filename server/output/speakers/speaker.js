'use strict'

const speaker = require('speaker')

module.exports = class Speaker {
  constructor() {
    this.opts = {
      channels: 2,          // 2 channels 
      bitDepth: 16,         // 16-bit samples 
      sampleRate: 44100     // 44,100 Hz sample rate 
    }
    this.speaker = new speaker(this.opts)
  }

  resetSpeaker() {
    console.log("RESETTING SPEAKER **** ")
    this.speaker.close()
    this.speaker = new speaker(this.opts)
  }
} 