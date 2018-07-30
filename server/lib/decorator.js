const Router = require('koa-router')
const symbolPrefix = Symbol('prefix')
const glob = require('glob')
const routerMap = new Map()
const _ = require('ladash')
export const isArray = c => (_.isArray(c) : c : [c])

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  // 加载每一个路由文件 初始化每一个路由控制器
  init() {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(path => require(path))
    
    for (let [conf, controller] of routerMap) {
      // todo 不太理解为什么可能是数组
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]      

      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      // todo 真心不太懂为什么这里第二额参数是平铺下controllers
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.use(this.router.allowedMethods())
  }
}

export const normalizePath = path => path.startsWith('/') ? path : `/${path}`

export const controller = path => target => {
  return target.prototype[symbolPrefix] = path
}

export const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)

  routerMap.set({
    target,
    ...conf
  }, target[key])
}

export const get = path => router({
  mothod: 'get',
  path: path,
})

export const post = path => router({
  mothod: 'post',
  path: path,
})

export const put = path => router({
  mothod: 'put',
  path: path,
})

export const del = path => router({
  mothod: 'del',
  path: path,
})

export const use = path => router({
  method: 'use',
  path: path,
})

export const all = path => router({
  method: 'all',
  path: path,
})


