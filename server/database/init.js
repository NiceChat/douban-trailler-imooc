const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban'
const glob = require('glob')
const { resolve } = require('path')

const connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db, { useNewUrlParser: true })

    mongoose.connection.on('error', () => {
      if (maxConnectTimes < 5) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        throw new Error('Conencted Error!')
        reject()
      }
    })

    mongoose.connection.on('disconnected', () => {
      if (maxConnectTimes < 5) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        throw new Error('Conencted Lost!')
        reject()
      }
    })

    mongoose.connection.once('open', () => {
      console.log('mongoDB Connected Successful!')
      resolve()
    })
  })
}

const initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(path => require(path))
}

const initAdmin = async () => {
  const User = mongoose.model('User')

  let user = await User.findOne({
    username: 'admin',
  })

  if (!user) {
    user = new User({
      username: 'admin',
      password: 'admin12',
      email: 'oddboy1990@gmail.com',
      role: 'admin'
    })

    await user.save()
  }
}

module.exports = { connect, initSchemas, initAdmin }