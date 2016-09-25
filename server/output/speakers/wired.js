'use strict'

const defaultOpts = {
  channels: 2,          // 2 channels 
  bitDepth: 16,         // 16-bit samples 
  sampleRate: 44100     // 44,100 Hz sample rate 
}

const Speaker = require('speaker')

module.exports = function (params, fn) {
  const speaker = new Speaker(defaultOpts)
  const name = 'wired'
  return fn(null, {speaker, name})
}
