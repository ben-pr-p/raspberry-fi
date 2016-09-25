import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import PauseSVG from 'material-ui/svg-icons/av/pause-circle-outline'
import PlaySVG from 'material-ui/svg-icons/av/play-circle-outline'
import IconButton from 'material-ui/IconButton'
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


  renderCurrentSong() {
    const {playing, queue, paused} = this.props.info

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
          leftIcon={<IconButton onTouchTap={() => console.log(`need to delete ${playing.name}`)}><ClearSVG /></IconButton>}
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
