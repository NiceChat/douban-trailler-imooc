const Router = require('koa-router')
const symbolPrefix = Symbol('prefix')
const glob = require('glob')
const routerMap = new Map()
const _ = require('lodash')
const { resolve } = require('path')
export const toArray = c => (_.isArray(c) ? c : [c])

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
      // console.log("查看:" + controller)
      const controllers = toArray(controller)
      let prefixPath = conf.target[symbolPrefix]

      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
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
    ...conf,
  }, target[key])
}

export const get = path => router({
  method: 'get',
  path: path,
})

export const post = path => router({
  method: 'post',
  path: path,
})

export const put = path => router({
  method: 'put',
  path: path,
})

export const del = path => router({
  method: 'del',
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


