'use strict'

const log = require('debug')('r-fi:bluetooth')
const bluetoothSerialPort = require('bluetooth-serial-port')
const btSerial = new bluetoothSerialPort.BluetoothSerialPort()

let pastDevices = new Set()
let devices = null
let lastConnected = null

const wired = {
  address: 'local',
  name: 'Wired Speakers',
  seenAt: null,
  deviceType: 'wired'
}

btSerial.on('found', (address, name) => {
  const seenAt = Date.now()
  const deviceType = 'bluetooth'
  log('Saw device %j', {address, name, seenAt, deviceType})

  devices.push({address, name, seenAt, deviceType})
  pastDevices.add({address, name, seenAt, deviceType})
})

exports.getDevices = function () {
  log('Inquiring...')
  devices = []
  pastDevices = new Set()
  btSerial.inquire()

  return devices.concat([wired])
}

exports.toggleConnectionTo = function (address, fn) {
  let device
  device = devices.filter(d => d.address == address)[0]

  if (!device) {
    device = Array.from(pastDevices).filter(d => d.address == address)[0]
  }

  if (lastConnected && lastConnected.address == address) {
    log('We\'re already connected to %s', address)
    log('Closing...')
    btSerial.close()
    lastConnected = null
    device.connected = false
    log('...closed')
    return fn(null, devices.concat([wired]))
  }

  if (lastConnected) {
    let lastDevice = devices.filter(d => d.address == lastConnected.address)[0]
    lastDevice.connected = false
    log('Switched connection off of %s', lastDevice.address)
  }

  btSerial.findSerialPortChannel(address, (channel) => {
    log('Device %j lives on channel %s', device, channel)
    log('Connecting...')

    btSerial.connect(device.address, channel, (err, nothing) => {
      log('...connected')
    })

    btSerial.on('data', (chunk) => {
      log('Received %j from %s', chunk, device.name)
    })

    const empty = Buffer.from(new Array(4608).fill(0))
    btSerial.write(empty, (err, bytes) => {
      log(err)
      log(bytes)
    })

    device.connected = true
    lastConnected = device
    return fn(null, devices.concat([wired]))
  })
}

exports.getDeviceConnection = function () {
  return btSerial
}

