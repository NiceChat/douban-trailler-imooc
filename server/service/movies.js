const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

export const getAllMoives = async (type, year) => {
  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.years = year
  }

  const movies = await Movie.find(query)

  return movies
}

export const getMovieDetail = async (id) => {
  const movie = await Movie.findOne({_id: id})

  return movie
}

export const getRelativeMovies = async (movie) => {
  const movies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })

  return movies
}

export const deleteMovie = async ({ id }) => {
  const movie = await Movie.findOne({_id: id})

  if (movie) {
    await Movie.findOneAndRemove({
      _id: id
    })

    return ({
      code: 200,
      success: true,
      error: '',
    })
  }


  return ({
    code: 201,
    success: false,
    error: `${id}不存在, 无法删除.`,
  })
}