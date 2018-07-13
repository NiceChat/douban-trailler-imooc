const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    type: String,
    unique: true,
  },// done
  rate: Number, // 得分 done
  title: String, // 标题 done
  category: [{
    type: ObjectId,
    ref: 'Category'
  }], // 属于哪个分类 
  summary: String, // 概况 done
  video: String, // 视频url
  videoKey: String, // 图床上的key
  cover: String, // 封面url
  coverKey: String, // 图床上的封面key
  poster: String, // 宣传海报 done
  posterKey: String, // 图床上的宣传海报
  rawTitle: String, // 原始标题 done
  movieTypes: [String], // 电影类型 done
  publicDate: Mixed, // 发布日期 done
  years: String, // 发布年份 done 
  tags: [String], // 标签 done
  meta: { // 创建和更新日期
    createTime: {
      type: Date,
      default: Date.now()
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
  }
}) 

movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  } 

  next()
})

mongoose.model('Movie', movieSchema)
