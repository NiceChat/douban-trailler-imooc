const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(script, []) 
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
    error && (console.log(error))
  })

  child.on('message', data => {
    let { result } = data

    result.forEach(async item => {
      try {
        let movie = await Movie.findOne({ doubanId: item.doubanId })

        if (!movie) {
          let newMovie = new Movie(item)
          await newMovie.save()
        }
      } catch(err) {
        console.log(err)
      }
    })
  })
})()