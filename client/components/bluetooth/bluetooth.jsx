import React from 'react'
import Paper from 'material-ui/Paper'
import api from '../../api'
import SpeakerIcon from 'material-ui/svg-icons/hardware/speaker'
import BluetoothIcon from 'material-ui/svg-icons/device/bluetooth'
import FlatButton from 'material-ui/FlatButton'
import closest from 'component-closest'

const icons = {
  wired: (<SpeakerIcon className='type-icon' />),
  bluetooth: (<BluetoothIcon className='type-icon' />)
}

export default class MyAppBar extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      devices: [],
      connectedTo: null
    }
  }

  componentWillMount () {
    this.loadBluetoothDevices()
  }

  toggleConnection (ev) {
    let paper = closest(ev.target, '.item', true)
    let address = paper.getAttribute('data')

    api
    .toggleBluetooth(address)
    .then(devices => {
      this.setState({devices, loading: false})
    })
    .catch(err => {
      debugger
    })
  }

  loadBluetoothDevices () {
    api
    .bluetoothList()
    .then(devices => {
      this.setState({devices, loading: false})
    })
    .catch(err => {
      debugger
    })
  }

  render () {
    const blueDevices = this.state.devices.map(d => {
      let button
      if (d.deviceType == 'bluetooth') {
        if (d.connected) {
          button = (
            <FlatButton data={d.address} label='Disconnect' secondary={true} onClick={this.toggleConnection.bind(this)} />
          )
        } else {
          button = (
            <FlatButton data={d.address} label='Connect' primary={true} onClick={this.toggleConnection.bind(this)} />
          )
        }
      }

      return (
        <Paper className='item' key={d.name} data={d.address} >
          <div className='item-name'>
            {d.name}
          </div>
          {button}
          <div className='item-type'>
            {icons[d.deviceType]}
          </div>
        </Paper>
      )
    })

    return (
      <div className='item-container'>
        {blueDevices}
      </div>
    )
  }
}

