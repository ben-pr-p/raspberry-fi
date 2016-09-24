import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

window.onload = () => {
  ReactDOM.render(<Main/>, document.querySelector('#reactAppContainer'))
}
