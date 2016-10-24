'use strict'

const bluetoothSerialPort = require('bluetooth-serial-port')
const btSerial = new bluetoothSerialPort.BluetoothSerialPort()
const log = require('debug')('r-fi:bluetooth-speaker')
const stream = require('stream')

module.exports = function (address, fn) {
  const data = {
    name: 'bluetooth',
    speaker: null
  }

  btSerial.findSerialPortChannel(address.address, (channel) => {
    log('Connecting to address %s', address.address)

    btSerial.connect(address.address, channel, () => {
      log('Connected')

      btSerial.on('data', (chunk) => {
        log('Received %j from %s', chunk, address)
      })

      data.speaker = new stream.Writable({
        write: function (chunk, encoding, done) {
          btSerial.write(chunk, (err, bytesWritten) => {
            if (err) {
              log(err)
            }

            else {
              log(bytesWritten)
              log('Wrote %d bytes', bytesWritten)
            }

            done()
          })
        }
      })

      fn(null, data)
    })

    const empty = Buffer.from(new Array(4608).fill(0))
    btSerial.write(empty, (err, bytesWritten) => {
      log(err)
      log(bytesWritten)
    })

    data.speaker = new stream.Writable({
      write: function (chunk, encoding, done) {
        btSerial.write(chunk, (err, bytesWritten) => {
          if (err) {
            log(err)
          }

          done()
        })
      }
    })

    return fn(null, data)
  })
}
