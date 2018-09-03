const Koa = require('koa')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const { router } = require('./middlewares/router')
const { parcel } = require('./middlewares/parcel')
const { bodyparser, logger } = require('./middlewares/common')

// 等待数据库连接
;(async () => {
  await connect()
  initSchemas()

  // const Moive = mongoose.model('Moive')
  // const moives = await Moive.find({})
  // console.log(moives)

  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')
  // await initAdmin()

  const app = new Koa()
  await bodyparser(app)
  await logger(app)
  await router(app)
  await parcel(app)

  app.listen(4455)
})()
