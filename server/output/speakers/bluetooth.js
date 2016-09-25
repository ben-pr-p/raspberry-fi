'use strict'

const log = require('debug')('r-fi:bluetooth')
const bluetoothSerialPort = require('bluetooth-serial-port')
const btSerial = new bluetoothSerialPort.BluetoothSerialPort()

btSerial.on('found', (address, name) => {
  log(address)
  log(name)
})
