import {
  post,
  controller,
  get,
  auth,
  role,
  del,
  request
} from '../lib/decorator'

import {
  checkPassword,
  addNewUser,
} from '../service/admin'

import {
  getAllMoives,
  deleteMovie,
} from '../service/movies'

@controller('/api/v0/admin')
export class adminController {
  @post('/login')
  @request([
    'email',
    'password'
  ])
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
        code: 200,
        success: true,
        msg: '登录成功！',
        data: user,
      })
    }

    if (!matchData.match) {
      return (ctx.body = {
        code: 201,
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
    const { userName, password, confirmPassword, email } = ctx.request.body

    console.log(password, confirmPassword)
    if (password !== confirmPassword) {
      return (ctx.body = {
        code: 201,
        success: false,
        error: '输入密码不一致，请重新输入。'
      })
    }

    const newUser = await addNewUser({ userName, password, email })

    if (newUser.success) {
      return (ctx.body = {
        code: 200,
        data: newUser.user,
        success: true
      })
    }

    return (ctx.body = {
      code: 201,
      success: false,
      error: newUser.error
    })
  }

  @post('/logout')
  async logout(ctx, next) {
    const { user } = ctx.session

    if (!user) {
      return (ctx.body = {
        success: false,
        error: '您尚未登录',
      })
    }

    ctx.session.user = null
    return ( ctx.body = {
      success: true,
      error: ''
    })
  }

  @del('/del/:id')
  @auth
  @role('admin')
  @request(['id'])
  async del(ctx, next) {
    const { id } = ctx.params
    const result = await deleteMovie({ id })

    return (ctx.body = {
      code: result.code,
      success: result.success,
      error: result.error,
    })
  }
}
