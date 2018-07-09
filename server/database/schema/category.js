const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  movies: [{
    type: ObjectId,
    ref: 'Movie',
  }],
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

categorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  } 

  next()
})

mongoose.model('Category', categorySchema)
