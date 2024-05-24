import { AUTH_TOKEN } from '@/utils/contant.js'
import { getItem } from '@/utils/storage.js'
import { ElMessage } from 'element-plus'
import { stringify, transformParams } from '@/utils/index.js'

const request = (method, url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    if(url.indexOf('/api') === -1) {
      url = '/api' + url
    } else if (url.indexOf('api') === 0) {
      url = '/' + url
    }
    const headers = new Headers(config.headers || {});
    headers.append('Content-Type', 'application/json');

    const token = getItem(AUTH_TOKEN)
    if(token) {
      headers.append('Authorization', token)
    }
    const fetchConfig = {
      method,
      headers,
      timeout: 30000,
      ...config
    }
    if (['GET', 'HEAD'].includes(method)) {
      if (data) {
        url = url + '?' + transformParams(data)
      }
    }  else {
      fetchConfig['body'] = stringify(data)
    }
    fetch(url, fetchConfig)
      .then(response => {
        if (response.status !== 200) {
          throw response
        }
        return response.json()
      })
      .then(data => resolve(data))
      .catch(error => {
        ElMessage.error(error?.statusText || error?.message || '网络异常')
        if (error.status === 401) {
          window.location.href = '/login'
          return
        }
        return reject(error)
      })
  })
}

const get = (url, params, config) => {
  return request('GET', url, params, config)
}
const post = (url, data, config) => {
  return request('POST', url, data, config)
}

const put = (url, data, config) => {
  return request('PUT', url, data, config)
}

const del = (url, data, config) => {
  return request('DELETE', url, data, config)
}

export default {
  get,
  post,
  put,
  delete: del
}
