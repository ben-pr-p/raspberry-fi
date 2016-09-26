import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import PauseSVG from 'material-ui/svg-icons/av/pause-circle-outline'
import PlaySVG from 'material-ui/svg-icons/av/play-circle-outline'
import IconButton from 'material-ui/IconButton'
import SkipSVG from 'material-ui/svg-icons/av/skip-next'
import ClearSVG from 'material-ui/svg-icons/content/clear'
import MenuItem from 'material-ui/MenuItem'
import api from '../api/index'

export default class Queue extends React.Component {
  constructor () {
    super()
    this.state = {
      paused: false
    }
  }

  render () {
    debugger
    const {playing, queue} = this.props.info

    return (
      <Paper>
        {this.renderListSongs(queue)}
      </Paper>
    )
  }

  buttonPressed(toPause) {
    this.setState({paused: toPause})
    if(toPause){
      console.log("GOING TO PAUSE")
      api
        .pauseSong()
        .catch(err => {
          debugger
        })
    } else {
      console.log("GOING TO PLAY")
      api
      .resume()
      .catch(err => {
        debugger
      })
    }
  }

  deleteSong (link) {
    api.deleteFromQueue(link)
      .then(info => {
        this.props.handleDelete(info)
      })
      .catch(err => {
        console.error('deleting not working')
      })
  }

  skipSong() {
    api
    .skip()
      .then(info => {
        console.log(info)
        this.props.handleDelete(info)
      })
      .catch(err => {
        console.error('skip failed')
      })
  }


  renderCurrentSong() {
    const {playing, queue, paused} = this.props.info // what is playing is never in queued

    if (playing.name != null) {
      console.log('returning current song')
      return (
        <ListItem
          key={playing.name}
          primaryText={playing.name}
          secondaryText={playing.duration}
          rightIconButton={this.state.paused ? 
             (<IconButton onTouchTap={this.buttonPressed.bind(this, false)}><PlaySVG /></IconButton>):
             (<IconButton onTouchTap={this.buttonPressed.bind(this, true)}><PauseSVG /></IconButton>)
           }
         leftIcon={<IconButton onTouchTap={this.skipSong.bind(this)}><SkipSVG /></IconButton>}
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
          leftIcon={<IconButton onTouchTap={this.deleteSong.bind(this, s.name)}><ClearSVG /></IconButton>}
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
