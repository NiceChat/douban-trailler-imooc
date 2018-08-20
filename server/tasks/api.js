const rq = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

const fetch = async (id) => {
  console.log(`获取的电影id是${id}`)
  const url = `https://api.douban.com/v2/movie/${id}`
  const result = await rq(url)

  return JSON.parse(result)
}

;(async () => {
  const movies = await Movie.find({
    $or: [
      { summary: { $exists: false }},
      { summary: null },
      { title: '' },
      { summary: '' },
    ]
  })

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetch(movie.doubanId)

    if (movieData) {
      let tags = movieData.tags.map(tag => tag.name)
      movie.tags = tags
      movie.summary = movieData.summary
      movie.rawTitle = movie.title

      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []
        for (let j = 0; j < movie.movieTypes.length; j++) {
          const types = movie.movieTypes[j]
          let cat = await Category.findOne({
            name: types
          })

          if (!cat) {
            cat = new Category({
              name: types,
              movies: [movie._id]
            })
          } else {
            if (!cat.movies.includes(movie._id)) {
              cat.movies.push(movie._id)
            }
          }

          await cat.save()

          if (movie.category.length > 0) {
            if (!movie.category.includes(cat._id)) {
              movie.category.push(cat._id)
            }
          } else {
            movie.category.push(cat._id)
          }
        }

        movie.publicDate = movieData.attrs.pubdate[0]
        movie.years = movieData.attrs.year[0] || '未知'
      }
    }

    await movie.save()
  }
})()