'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const log = require('debug')('r-fi:app')

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

const queue = []

const youtube = require('./youtube')

const Output = require('./output')
const outManager = new Output()

const setStream = (stream) => {
  outManager.repipe(stream)
}

const Input = require('./input')
const inManager = new Input(setStream)

app.get('/search/:value', (req, res) => {
  youtube.search(req.params.value, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }

    log('Found search results %j', results)
    return res.json(results)
  })
})

app.get('/queue/add/:link', (req, res) => {
  inManager.handleAdd(req.params.link)
  res.json(inManager.queue)
})

log('Listening on 3000...')
app.listen('3000')

