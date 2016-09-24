import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import AutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'
import api from '../api/index'

export default class Main extends React.Component {
  constructor () {
    super()

    this.state = {
      results: []
    }
  }

  handleInput (value) {
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

  selectVideo (ev) {
    const link = ev.getAttribute('data')
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
        <Paper className='video-result'
          onClick={this.selectVideo.bind(this)}
          data={video.link}
        >
          <img src={video.thumbnail} />
          {video.title}
        </Paper>
      )
    }
  }
}

