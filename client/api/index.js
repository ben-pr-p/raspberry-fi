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

methods.play = function (link) {
  const id = link.split('=')[1]
  return new Promise((resolve, reject) => {
    request
    .get(`play/${id}`)
    .end((err, res) => {
      if (err) {
        reject(err)
      }

      return resolve(res)
    })
  })
}

export default methods
