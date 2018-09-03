import AC from './components/async_load'

export default [
  {
    name: '首页',
    path: '/',
    component: AC(() => require('./views/home')),
  },
  {
    name: '首页',
    path: '/list/:type?',
    component: AC(() => require('./views/home')),
  },
  {
    name: '详情',
    path: '/detail/:id',
    component: AC(() => require('./views/movie/detail'))
  },
  {
    name: '登录',
    path: '/login',
    component: AC(() => require('./views/admin/login'))
  },
]