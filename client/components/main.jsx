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

    console.log(api)
  }

  handleInput (value) {
    api
    .search(value)
    .then(results => {
      this.setState({results})
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
}
