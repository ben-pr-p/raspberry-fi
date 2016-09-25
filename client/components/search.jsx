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

export default class Search extends React.Component {
  constructor () {
    super()

    this.state = {
      results: []
		}
	}

  selectVideo (ev) {
    const clicked = closest(ev.target, '.video-result', true)
    const link = clicked.getAttribute('data')

    api
    .addToQueue(link)
    .then(info => {
      console.log(info)
      this.setState(info)
    })
    .catch(err => {
      debugger
    })
  }

  handleInput (value) {
    if (value && value != '') {
      api
      .search(value)
      .then(results => {

        const rendered = results.map(r => this.renderResult(r))
        this.setState({results: rendered})
      })
      .catch(err => {
        debugger
      })
    }
  }

  render () {
		console.log('returning search')

    return (
			<Paper>
        <AutoComplete
          hintText='Search a song'
          dataSource={this.state.results}
          onUpdateInput={this.handleInput.bind(this)}
          className='list'
          fullWidth={true}
          style={{width:'80%', display: 'block', margin: 'auto', fontSize:'25px'}}
          filter={AutoComplete.noFilter}
        />
      </Paper>
    )
  }

  renderResult (video) {
    return {
      text: video.title,
      value: (
        <MenuItem className='video-result'
          onClick={this.selectVideo.bind(this)}
          data={video.link}
        >
        <img src={video.thumbnail} />
        <div className='video-title'>
          <div className='video-title-text' >
            {video.title}
          </div>
        </div>
        </MenuItem>
      )
    }
  }
}
