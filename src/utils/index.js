import dayjs from 'dayjs'

export const stringify = (value) => {
  if (typeof value === 'object') return JSON.stringify(value)
  return value
}


export const parse = (value) => {
  if (typeof value === 'string') return JSON.parse(value)
  return value
}

export const transformParams = (params) => {
  if (typeof params === 'object') return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  return params + ''
}


export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (dayjs(date).isValid()) return dayjs(date).format(format)
  return date
}
