import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import {GridList, GridTile} from 'material-ui/GridList'

const images = {
  wired: 'http://www.iphone-tips-and-advice.com/image-files/iPhone-speaker-wired.jpg',
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

  loadBluetoothDevices () {
    this.setState({loading: true})

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
      return (
        <GridTile
          key={d.name}
          title={d.name}
          subtitle={d.deviceType}
        >
          <img src={d.img} />
        </GridTile>
      )
    })

    return (
      {blueDevices}
    )
  }
}
