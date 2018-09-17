import {
  get,
  controller
} from '../lib/decorator'

import {
  getAllMoives,
  getMovieDetail,
  getRelativeMovies,
} from '../service/movies'

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies(ctx, next) {
    const type = ctx.query.type
    const year = ctx.query.year

    const movies = await getAllMoives(type, year)
    ctx.body = {
      data: movies,
      success: true
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies,
      },

      success: true
    }
  }
}
