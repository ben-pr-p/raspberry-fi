'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const log = require('debug')('r-fi:app')

const youtubeStream = require('youtube-audio-stream')

const app = express()
app.use(bodyParser.json())
app.use(express.static('./build'))

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index.pug')
})

/*
 * Local dependencies
 */

const search = require('./search')
const Output = require('./output')

const manager = new Output()

app.get('/search/:value', (req, res) => {
  search(req.params.value, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }

    log('Found search results %j', results)
    return res.json(results)
  })
})

app.get('/play/:link', (req, res) => {

  manager.repipe(youtubeStream(req.params.link))
  res.sendStatus(200)
})

log('Listening on 3000...')
app.listen('3000')
