const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()

router.get('/movies', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({}).sort({
    'meta.createTime': -1
  })

  ctx.body =  movies
})

module.exports = router