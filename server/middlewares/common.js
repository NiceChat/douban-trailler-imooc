import parser from 'koa-bodyparser'
import log from 'koa-logger'
import session from 'koa-session'

export const bodyparser = async app => {
  app.use(parser())
}

export const logger = async app => {
  app.use(log())
}

export const genSession = async app => {
  app.keys = ['Yangleilei']

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  }

  app.use(session(CONFIG, app))
}