import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import api from '../api/index'
import closest from 'component-closest'

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
      this.props.handleQueueAdd(info)
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
    return (
			<Paper>
        <AutoComplete
          hintText={<span className='big-text'>Search a song</span>}
          dataSource={this.state.results}
          onUpdateInput={this.handleInput.bind(this)}
          className='list'
          fullWidth={true}
          className='auto-complete'
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
