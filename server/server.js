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

const Input = require('./input')
const inManager = new Input()

app.get('/search/:value', (req, res) => {
  youtube.search(req.params.value, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }

    log('Found search results %j', results)
    return res.json(results)
  })
})

app.get('/queue', (req, res) => {
  return res.json({
    playing: inManager.playing,
    queue: inManager.queue
  })
})

app.get('/queue/add/:link', (req, res) => {
  inManager.handleAdd(req.params.link, (err, queue) => {
    if (err) {
      return res.status(500).send(err)
    }

    return res.json(queue)
  })
})

app.get('/bluetooth/list', (req, res) => {
  outManager.getDevices((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }

    return res.json(result)
  })
})

log('Listening on 3000...')
app.listen('3000')

