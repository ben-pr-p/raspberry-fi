'use strict'

const log = require('debug')('r-fi:child')
const youtube = require('../youtube')

const Output = require('../output')
const output = new Output()

let currentStream

log('Spawning...')

process.on('message', ({message, data}) => {
  if (message == 'song') {
    log('Got song %j', data)
    play(data)
  }

  if (message == 'pause') {
    pause()
  }
})

function play (song) {
  try {

    const id = song.id

    log('Playing %s', id)

    currentStream = youtube.streamAudio(id)
    output.repipe(currentStream)

    currentStream.on('end', () => {
      log('Audio stream downloaded - ended')
    })

  } catch (err) {
    log("Got error: %j", err)
  }
}
