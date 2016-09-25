import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import Search from './search'
import Queue from './queue'
import api from '../api/index'
import QueueSVG from 'material-ui/svg-icons/av/queue'
import SearchSVG from 'material-ui/svg-icons/action/search'
import NetworkSVG from 'material-ui/svg-icons/device/network-wifi'

export default class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      info : {playing: {}, queue: []},
      activeTab: 0 // 0: queue, 1: search, 2: devices
    }
  }

  componentWillMount () {
    api
    .getQueue()
    .then(info => {
      this.setState(info)
    })
    .catch(err => {
      debugger
    })
  }

  select (tab) {
    this.setState({activeTab: tab});
  }

  handleQueueAdd (info) {
    this.setState({info, activeTab: 0}) // sets the queue
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
          <Search handleQueueAdd = {this.handleQueueAdd.bind(this)}/>
        )
        break
      default:
        console.log('Case 0')
        tab = (
          <Queue info={this.state.info}/>
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

