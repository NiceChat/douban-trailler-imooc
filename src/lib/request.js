/*
* 封装axios的目的是为了新增一个loading的状态控制
*/
import axios from 'axios'
import { message } from 'antd'

const defaultAxiosConf = {
  timeout: 5000
}

const _request = (params = {}, fn = () => {}) => {
  return axios({...defaultAxiosConf, ...params})
    .then(res => {
      const { success, data, error, code } = res.data

      if (code === 401) {
        window.location.href = '/'
        return
      }

      if (success) {
        fn(false)

        return data
      }

      throw error
    })
    .catch(error => {
      fn(false)
      message.error(String(error || '网络错误'))
    })
}

export default (param) => {
  const type = typeof param

  if (type === 'function') {
    param(true)

    return (obj) => _request(obj, param)
  }

  if (type === 'object' && type !== null) {
    return _request(param)
  }
}