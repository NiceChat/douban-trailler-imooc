import Bundler from 'parcel-bundler'
import views from 'koa-view'
import serve from 'koa-static'
import { resolve } from 'path'

const r = path => resolve(__dirname, path)
const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/',
  watch: true,
})

export default async app => {
  await bundler.bundle()

  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render('index')
  })
}

