const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = '电影首页'
  await next()
})

app.listen(4455)