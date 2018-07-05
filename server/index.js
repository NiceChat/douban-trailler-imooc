const Koa = require('koa')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')

// 等待数据库连接
;(async () => {
  await connect()
  initSchemas()

  const Moive = mongoose.model('Moive')
  const moives = await Moive.find({})  
  console.log(moives)
})()

const app = new Koa()
// const { htmlTpl } = require('./tpl')
// const { ejsTpl } = require('./tpl')
// const { pugTpl } = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')
const views = require('koa-views')

app.use(views(resolve(__dirname, './views'), { 
    extension: 'pug' 
  }))

app.use(async (ctx, next) => {
  // ctx.type = "text/html; charset=utf-8"
  // ctx.body = ejs.render(ejsTpl, {
  //   name: 'Yangleilei'
  // })  
  // ctx.body = pug.render(pugTpl)
  // await next()
  await ctx.render('index', {
    title: 'Pug-Middleware',
    name: 'Yangleilei',
  })
})

app.listen(4455)