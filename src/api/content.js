import request from './index.js'

export  function getDetailApi(id) {
  return request.get(`/content/${id}`)
}


export const getListApi = (params) => {
  return request.get('/content', params)
}

export const createApi = (data) => {
  return request.post('/content', data)
}

export  const updateApi = (id, data) => {
  return request.put(`/content/${id}`, data)
}

export  const deleteApi = (id) => {
  return request.delete(`/content/${id}`)
}
