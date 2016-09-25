import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import AutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import api from '../api/index'
import closest from 'component-closest'

export default class Main extends React.Component {
  constructor () {
    super()

    this.state = {
      results: []
    }
  }

  handleInput (value) {
    if (value && value != '') {
      api
      .search(value)
      .then(results => {
        console.log(results)
        const rendered = results.map(r => this.renderResult(r))
        this.setState({results: rendered})
      })
      .catch(err => {
        debugger
      })
    }
  }

  selectVideo (ev) {
    const clicked = closest(ev.target, '.video-result', true)
    const link = clicked.getAttribute('data')

    api
    .addToQueue(link)
    .then(ok => {
      console.log(ok)
    })
    .catch(err => {
      debugger
    })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          <AutoComplete
            hintText='Search a song'
            dataSource={this.state.results}
            onUpdateInput={this.handleInput.bind(this)}
            fullWidth={true}
          />
        </Paper>
      </MuiThemeProvider>
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
          {video.title}
        </MenuItem>
      )
    }
  }
}

