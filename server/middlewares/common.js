import parser from 'koa-bodyparser'
import log from 'koa-logger'

export const bodyparser = async app => {
  app.use(parser())
}

export const logger = async app => {
  app.use(log())
}