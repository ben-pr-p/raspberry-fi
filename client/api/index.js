import request from 'superagent'

const methods = {}

methods.search = function (value) {
  return new Promise((resolve, reject) => {
    request
    .get(`search/${value}`)
    .end((err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res.body)
    })
  })
}

methods.resume = function(){
  return new Promise((resolve, reject) => {
    request
    .get(`resume`)
    .end((err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res.body)
    })
  })
}

methods.pauseSong = function (name) {
  return new Promise((resolve, reject) => {
    request
    .get(`pause`)
    .end((err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res.body)
    })
  })
}

methods.addToQueue = function (link) {
  const id = link.split('=')[1]
  return new Promise((resolve, reject) => {
    request
    .get(`queue/add/${id}`)
    .end((err, res) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      return resolve(res.body)
    })
  })
}

methods.deleteFromQueue = function (id) {
  return new Promise((resolve, reject) => {
    request
    .get(`queue/delete/${id}`)
    .end((err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res.body)
    })
  })
}

methods.skip = function () {
  return new Promise((resolve, reject) => {
    request
    .get('skip')
    .end((err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res.body)
    })
  })
}

methods.getQueue = function () {
  return new Promise((resolve, reject) => {
    request
    .get('queue')
    .end((err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res.body)
    })
  })
}

methods.bluetoothList = function () {
  return new Promise((resolve, reject) => {
    request
    .get('bluetooth/list')
    .end((err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res.body)
    })
  })
}

methods.toggleBluetooth = function (address) {
  return new Promise((resolve, reject) => {
    request
    .get(`bluetooth/toggle/${address}?random=${Math.random()}`)
    .end((err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res.body)
    })
  })
}


export default methods
