import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import AudioTrack from 'material-ui/svg-icons/image/audiotrack'
import QueueMusic from 'material-ui/svg-icons/av/queue-music'
import MenuItem from 'material-ui/MenuItem'
import api from '../api/index'

export default class Queue extends React.Component {
  constructor () {
    super()
  }

  render () {
    const {playing, queue} = this.props.info
    console.log('returning queue')

    return (
      <Paper>
        {this.renderListSongs(queue)}
      </Paper>
    )
  }

  renderCurrentSong() {
    const {playing, queue} = this.props.info

    if (playing.name != null) {
      console.log('returning current song')
      return (
        <ListItem
          key={playing.name}
          primaryText={playing.name}
          secondaryText={playing.duration}
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
