const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

;(async () => {
  const script = resolve(__dirname, '../crawler/video')
  const child = cp.fork(script, [])
  const movies = await Movie.find({
    $or: [
      { video: { $exists: false } },
      { video: null },
      { video: '' },
      { cover: { $exists: false} },
      { cover: ''},
      { cover: null },
    ]
  })
  let invoked = false

  child.on('error', error => {
    if (invoked) return

    invoked = true
    console.log('错误')
    console.log(error)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let error = code === 0 ? null : new Error('exit code:' + code)
    console.log('退出')
    console.log(error)
  })

  child.on('message', async data => {
    const movie = await Movie.findOne({
      doubanId: data.id
    })

    if (data.video) {
      movie.cover = data.cover
      movie.video = data.video

      await movie.save()
    } else {
      await movie.remove()

      const movieTypes = movie.movieTypes
      movieTypes.forEach(async type => {
        const cat = await Category.findOne({
          name: type
        })

        if (cat) {
          const index = cat.movies.indexOf(movie._id)

          if (index !== -1) {
            cat.movies.splice(index, 1)
            await cat.save()
          }
        }
      })
    }

  })

  // child.send([movies[0]])
  child.send(movies)
})()