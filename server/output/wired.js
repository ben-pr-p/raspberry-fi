// Should export a stream
const Speaker = require('speaker')

module.exports = new Speaker({
    channels: 2,          // 2 channels 
    bitDepth: 16,         // 16-bit samples 
    sampleRate: 44100     // 44,100 Hz sample rate 
    });
