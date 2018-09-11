const mongoose = require('mongoose')
const User = mongoose.model('User')

export const checkPassword = async (email, password) => {
  let match = false
  const user = await User.findOne({ email })

  if (user) {
    match = await user.comparePassword(password, user.password)
  }

  return {
    match,
    user
  }
}

export const addNewUser = async ({ email, userName, password }) => {
  console.log( email )
  const User = mongoose.model('User')
  let user = await User.findOne({ email: email })

  if (!user) {
    user = new User({
      email,
      username: userName,
      password,
      role: 'user'
    })

    await user.save()

    return ({
      success: true,
      user,
    })
  }

  return ({
    success: false,
    error: '该账户已存在'
  })
}
