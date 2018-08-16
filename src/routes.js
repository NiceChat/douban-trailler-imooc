import AC from './components/async_load'

export default [
  {
    name: '首页',
    path: '/',
    component: AC(() => import('./views/home')), 
  },
  {
    name: '详情',
    path: '/detail/:id',
    component: AC(() => import('./views/movie/detail')) 
  },
]