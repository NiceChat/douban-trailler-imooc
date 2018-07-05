const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    type: String,
    unique: true,
  },
  rate: Number,
  title: String,
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  summary: String,
  vido: String,
  vidoKey: String,
  cover: String,
  coverKey: String,
  poster: String,
  posterKey: String,
  rawTitle: String,
  moiveTypes: [String],
  publicDate: Mixed,
  years: String, 
  tags: [String],
  meta: {
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

movieSchema.pre('save', next => {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  } 

  next()
})

mongoose.model('Moive', movieSchema)
