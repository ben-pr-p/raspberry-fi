import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import PauseSVG from 'material-ui/svg-icons/av/pause-circle-outline'
import PlaySVG from 'material-ui/svg-icons/av/play-circle-outline'
import ClearSVG from 'material-ui/svg-icons/content/clear'
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
          rightIcon={<PauseSVG />}
          leftIcon={<ClearSVG />}
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
          leftIcon={<ClearSVG />}
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
