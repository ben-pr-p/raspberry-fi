import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

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
        <MenuItem primaryText={d.name} />
      )
    })

    return (
      <AppBar
        className="AppBar"
        title="Raspberry Fi"
        iconElementLeft={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Bluetooth"
              onClick={this.loadBluetoothDevices.bind(this)}
              menuItems={blueDevices} />
          </IconMenu>
        }
      />
    )
  }
}
