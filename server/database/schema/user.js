const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const MAX_TRY_TIMES = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  loginTimes: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: {
    type: Number,
    default: 1,
  },
  role: {
    type: String,
    default: 'user',
  },
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

// 设置虚拟字段
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// 更新创建日期
userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }

  next()
})

// 加盐加密
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) next()

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err)
      this.password = hash
      next()
    })
  })
})

// 挂载在schema上的方法
userSchema.methods = {
  comparePassword: function(_password, password) {
    return new Promise( (resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },

  // 判断当前用户是否超过登录次数
  incLoginTimes: function (user) {
    return new Promise( (resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginTimes: 1,
          },
          $unset: {
            lockUntil: 1,
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginTimes: 1,
          }
        }

        if (this.loginTimes + 1 >= MAX_TRY_TIMES && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now + LOCK_TIME
          }
        }

        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

mongoose.model('User', userSchema)
