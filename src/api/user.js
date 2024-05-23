import request from './index.js'
export function loginApi(data) {
  return request.post('/login', data)
}

export const registerApi = (data) => {
  return request.post('/register', data)
}


export const getUserApi = () => {
  return request.get('/user')
}
