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
    this.speaker.close()
    this.speaker.end()
    this.speaker = new Speaker(this.opts)
  }
} 