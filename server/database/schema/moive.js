const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    type: String,
    unique: true,
  },
  rate: Number, // 得分
  title: String, // 标题
  category: {
    type: ObjectId,
    ref: 'Category'
  }, // 属于哪个分类
  summary: String, // 概况
  vido: String, // 视频url
  vidoKey: String, // 图床上的key
  cover: String, // 封面url
  coverKey: String, // 图床上的封面key
  poster: String, // 宣传海报
  posterKey: String, // 图床上的宣传海报
  rawTitle: String, // 原始标题
  moiveTypes: [String], // 电影类型
  publicDate: Mixed, // 发布日期
  years: String, // 发布面粉 
  tags: [String], // 标签
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

mongoose.model('Moive', movieSchema)
