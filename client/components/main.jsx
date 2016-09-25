import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import Search from './search'
import Queue from './queue'
import QueueSVG from 'material-ui/svg-icons/av/queue'
import SearchSVG from 'material-ui/svg-icons/action/search'
import NetworkSVG from 'material-ui/svg-icons/device/network-wifi'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import AudioTrack from 'material-ui/svg-icons/image/audiotrack'
import QueueMusic from 'material-ui/svg-icons/av/queue-music'
import MenuItem from 'material-ui/MenuItem'
import api from '../api/index'
import closest from 'component-closest'
import Bluetooth from './bluetooth/bluetooth'

export default class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      activeTab: 0 // 0: queue, 1: search, 2: devices
    }
  }

  select (tab) {
    console.log ('selecting tab', tab)
    this.setState({activeTab: tab});
  }

  render () {

    let tab
    switch (this.state.activeTab) {
      case 2:
        console.log('Case 2')
        break
      case 1:
        console.log('Case 1')
        tab = (
          <Search />
        )
        break
      default:
        console.log('Case 0')
        tab = (
          <Queue />
        )
        break
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          {tab}
          <Paper zDepth={1}>
            <BottomNavigation style={{position: 'fixed'}} selectedIndex={this.state.selectedIndex} className='bottom-navigation'>
              <BottomNavigationItem
                label="Queue"
                icon={<QueueSVG />}
                onTouchTap={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Search"
                icon={<SearchSVG />}
                onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Devices"
                icon={<NetworkSVG />}
                onTouchTap={() => this.select(2)}
              />
            </BottomNavigation>
          </Paper>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

