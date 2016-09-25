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

const youtube = require('./youtube')

const Input = require('./input')
const inManager = new Input()

const bluetooth = require('./bluetooth')

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

app.get('/resume', (req, res) => {
  return inManager.resume((err) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.send('resumed')
  })
})

app.get('/pause', (req, res) => {
  inManager.handlePause((err) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.send('paused')
  })
})

app.get('/queue/add/:link', (req, res) => {
  // queue returns an object {playing, queue}
  inManager.handleAdd(req.params.link, (err, queue) => {
    if (err) {
      return res.status(500).send(err)
    }

    return res.json(queue)
  })
})

app.get('/bluetooth/list', (req, res) => {
  log('GET /bluetooth/list')

  const result = bluetooth.getDevices()
  log('Done inquiring...')
  return res.json(result)
})

app.get('/bluetooth/toggle/:address', (req, res) => {
  log('GET /bluetooth/toggle/%s', req.params.address)

  bluetooth.toggleConnectionTo(req.params.address, (err, devices) => {
    res.json(devices)
  })
})

log('Listening on 3000...')
app.listen('3000')

