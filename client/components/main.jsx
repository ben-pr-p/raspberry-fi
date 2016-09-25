import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import AutoComplete from 'material-ui/AutoComplete'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Queue from 'material-ui/svg-icons/av/queue'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import api from '../api/index'

export default class Main extends React.Component {
  constructor () {
    super()

    this.state = {
      results: []
    }
  }

  handleInput (value) {
    debugger
    if (value != " ") {
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

  selectVideo (ev) {
    const link = ev.getAttribute('data')
  }

  render () {
    const styles = {
      button: {
        margin: 12
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
      }
    }
    let songList = [
      {name: 'cats'},
      {name: 'dogs'},
      {name: 'birds'}
    ]

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar
            className="AppBar"
            title="Raspberry Fi"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Paper>
          {this.renderListSongs(songList)}
        </Paper>
         <Paper>
            <AutoComplete
              hintText='Search a song'
              dataSource={this.state.results}
              onUpdateInput={this.handleInput.bind(this)}
              fullWidth={true}
            />
          </Paper>
          <RaisedButton
            label="ADD TO QUEUE"
            labelPosition="before"
            primary={true}
            icon={<Queue />}
            style={styles.button}
          />
        </div>
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

  renderListSongs(songList) {
    let songs = songList.map(s => {
      return (
        <ListItem
          primaryText={s.name}
          rightIcon={<CommunicationChatBubble />}
        />
      )
    })

  return (<List>
    <Subheader>Queue</Subheader>
    {songs}
  </List>)
  }
}
