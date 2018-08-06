import { 
  get,
  post,
  controller,
  use,
} from '../lib/decorator'

import {
  checkPassword
} from '../service/user'

@controller('/api/v0/user')
export class userController {
  @post('/')
  async check(ctx, next) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password) 

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        msg: '用户不存在'
      })
    }

    if (matchData.match) {
      return (ctx.body = {
        success: true,
        msg: ''
      }) 
    }

    if (!matchData.match) {
      return (cyx.body = {
        success: false,
        msg: '密码不存在'
      })
    }
  }
}
