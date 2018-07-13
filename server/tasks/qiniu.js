// 实现图片的上传
const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config/bucket')
const bucket = 'douban'
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const ak = config.bucket.AK
const sk = config.bucket.SK
const mac = new qiniu.auth.digest.Mac(ak, sk)
const qiniuConfig = new qiniu.conf.Config()
// qiniuConfig.zone = qiniuConfig.zone.Zone_z2
const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);

const uploadToQiniu = async (target, key) => {
  return new Promise((resolve, reject) => {
    bucketManager.fetch(target, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  const movies = await Movie.find({
    $or: [
      { posterKey: { $exists: false } },
      { posterKey: '' },
      { posterKey: null },
    ]
  })

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]

    try {
      console.log('上传海报')
      const posterData = await uploadToQiniu(movie.poster, i+'__'+nanoid()+".png")
      console.log('上传封面图')
      const coverData = await uploadToQiniu(movie.cover, i+'__'+nanoid()+".png")
      // console.log('上传视频')
      // const videoData = await uploadToQiniu(movie.video, nanoid()+".mp4")

      if(posterData.key) movie.posterKey = posterData.key
      if(coverData.key) movie.coverKey = coverData.key
      // if(videoData.key) movie.videoKey = videoData.key

      await movie.save()
    } catch(err) {
      console.log(err)
    }
  }
})()

