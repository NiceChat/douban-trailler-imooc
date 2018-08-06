import views from 'koa-view'
import serve from 'koa-static'
import { resolve } from 'path'

const r = path => resolve(__dirname, path) 
export default async app => {
  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}

