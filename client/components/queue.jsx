import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import AudioTrack from 'material-ui/svg-icons/image/audiotrack'
import QueueMusic from 'material-ui/svg-icons/av/queue-music'
import MenuItem from 'material-ui/MenuItem'
import api from '../api/index'
import closest from 'component-closest'
import Bluetooth from './bluetooth/bluetooth'

export default class Queue extends React.Component {
  constructor () {
    super()

    this.state = {
      playing: null,
      queue: []
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

  render () {
    console.log('returning queue')

    return (
      <Paper>
        {this.renderListSongs(this.state.queue)}
      </Paper>
    )
  }

  renderCurrentSong() {
    if (this.state.playing != null) {
      return (
        <ListItem
          key={this.state.playing.name}
          primaryText={this.state.playing.name}
          secondaryText={this.state.playing.duration}
          rightIcon={<AudioTrack />}
        />
      )
    }
  }

  renderListSongs(songList) {
    let songs = songList.map(s => {
      return (
        <ListItem
          key={s.name}
          primaryText={s.name}
          secondaryText={s.duration}
          rightIcon={<QueueMusic />}
        />
      )
    })

    return (<List
      className='list'
      >
      {this.renderCurrentSong()}
      {songs}
    </List>)
  }
}
