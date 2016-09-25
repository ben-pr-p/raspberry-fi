'use strict'

const log = require('debug')('r-fi:child')
const youtube = require('../youtube')

const Output = require('../output')
const output = new Output()

let currentStream

log('Spawning...')
speakerConnect()


process.on('message', ({message, data}) => {
  if (message == 'song') {
    log('Got song %j', data)
    play(data)
  }

  if (message == 'pause') {
    pause()
  }

  if (message == 'resume') {
    resume()
  }

  if (message == 'bluetooth-connect') {
    log('Happening 2')
    bluetoothConnect(data)
  }

  if (message == 'bluetooth-disconnect') {
    bluetoothDisconnect(data)
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

function pause (song) {
  console.log("PAUSING")
  output.pause()
}

function resume () {
  output.resume()
}

function speakerConnect () {
  output.addOutput('wired', {}, (err, status) => {
    if (err) {
      log('Unable to add output with type [wired], params: %j -- error: %j', {address}, err)
    }

    log('Successfully added output with type [wired], params: %j', {}, err)
  })
}

function bluetoothConnect (address) {
  output.addOutput('bluetooth', {address}, (err, status) => {
    if (err) {
      log('Unable to add output with type [bluetooth], params: %j -- error: %j', {address}, err)
    }

    log('Successfully added output with type [bluetooth], params: %j', {address}, err)
  })
}

