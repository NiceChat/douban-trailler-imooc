// 实现图片的上传
const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config/bucket')
const bucket = 'douban'

const movies = [
  { 
    doubanId: 27191829,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2513056531.jpg', 
    cover: 'https://img3.doubanio.com/img/trailer/medium/2523616161.jpg?1527767137',
    video: 'http://vt1.doubanio.com/201806261457/08a4a54befd744b912695c3edadf8dab/view/movie/M/402310721.mp4',
  },
]

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
  movies.map(async (movie, index) => {
    try {
      console.log('上传海报')
      const posterData = await uploadToQiniu(movie.poster, nanoid()+".png")
      console.log('上传封面图')
      const coverData = await uploadToQiniu(movie.cover, nanoid()+".png")
      console.log('上传视频')
      const videoData = await uploadToQiniu(movie.video, nanoid()+".mp4")

      if(posterData.key) movie.posterKey = posterData.key
      if(coverData.key) movie.coverKey = coverData.key
      if(videoData.key) movie.videoKey = videoData.key

      console.log(movie)
    } catch(err) {
      console.log(err)
    }
  })
})()

