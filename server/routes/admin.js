import {
  post,
  controller,
  get,
  auth,
  role
} from '../lib/decorator'

import {
  checkPassword,
  addNewUser,
} from '../service/admin'

import {
  getAllMoives,
} from '../service/movies'

@controller('/api/v0/admin')
export class adminController {
  @post('/login')
  async check(ctx) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        error: '用户不存在'
      })
    }

    if (matchData.match) {
      const user = matchData.user

      ctx.session.user = user
      return (ctx.body = {
        success: true,
        msg: '登录成功！',
        user,
      })
    }

    if (!matchData.match) {
      return (ctx.body = {
        success: false,
        error: '密码错误'
      })
    }
  }

  @get('/movies')
  @auth
  @role('admin')
  async getMoviesList(ctx, next) {
    const movies = await getAllMoives()

    ctx.body = {
      data: movies,
      success: true
    }
  }

  @post('/register')
  async setUser(ctx, next) {
    const { userName, password, checkPassword, email } = ctx.request.body

    if (password !== checkPassword) {
      return (ctx.body = {
        success: false,
        error: '输入密码不一致，请重新输入。'
      })
    }

    const newUser = await addNewUser({ userName, password, email})

    if (newUser.isSuccess) {
      return (ctx.body = {
        data: newUser.user,
        success: true
      })
    }

    return (ctx.body = {
      success: false,
      error: newUser.error
    })
  }
}
