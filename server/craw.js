const Koa = require('koa')
const mongoose = require('mongoose')
require('babel-register')
require('babel-polyfill')

const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const { router } = require('./middlewares/router')
const { parcel } = require('./middlewares/parcel')

// 等待数据库连接
;(async () => {
  await connect()
  initSchemas()
  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')

  await initAdmin()
})()
