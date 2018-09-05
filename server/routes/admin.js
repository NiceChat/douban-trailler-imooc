import {
  post,
  controller,
  del,
  get,
} from '../lib/decorator'

import {
  checkPassword
} from '../service/admin'

import {
  getAllMoives,
} from '../service/movies'

@controller('/api/v0/admin')
export class userController {
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
  async getMovies(ctx, next) {
    const movies = await getAllMoives()
    ctx.body = {
      data: movies,
      success: true
    }
  }

}
