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

mongoose.model('Category', categorySchema)
