'use strict'

const log = require('debug')('r-fi:bluetooth')
const bluetoothSerialPort = require('bluetooth-serial-port')
const btSerial = new bluetoothSerialPort.BluetoothSerialPort()

module.exports = class BluetoothManager {
  constructor () {
    this.devicesSeen = []
    this.connected = false
  }

  inquire () {
    btSerial.on('found', (address, name) => {
      const seenAt = Date.now()
      this.devicesSeen.push({address, name, seenAt})
    })
  }

  connectTo (address) {
    btSerial.findSerialPortChannel(address, channel => {
      btSerial.connect(address, channel, () => {
        const deviceName = this.devicesSeen.filter(d => d.address == address)
        log('Connected to device: %s', deviceName)

        this.connected = true
      })
    })
  }
}
