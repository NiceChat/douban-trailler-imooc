import {
  post,
  controller,
} from '../lib/decorator'

import {
  checkPassword
} from '../service/user'

@controller('/api/v0/user')
export class userController {
  @post('/')
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
      return (ctx.body = {
        success: true,
        msg: ''
      })
    }

    if (!matchData.match) {
      return (ctx.body = {
        success: false,
        error: '密码错误'
      })
    }
  }
}
