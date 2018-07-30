import mongoose from 'mongoose'
import { get, post, controller } from '../lib/decorator'

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies(ctx, next) {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
      'meta.createTime': -1
    })

    ctx.body =  movies
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    const movies = await Movie.findOne({doubanId: id})

    ctx.body = movies
  }
}
