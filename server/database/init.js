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

    mongoose.connect(db)

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
      // const Cat = mongoose.model('Cat', { name: String });
      // const kitty = new Cat({ name: 'Yangleilei' });
      // kitty.save().then(() => console.log('nice'));
      console.log('mongoDB Connected Successful!')
      resolve()
    })
  })
}

const initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(path => require(path))
}

module.exports = { connect, initSchemas }