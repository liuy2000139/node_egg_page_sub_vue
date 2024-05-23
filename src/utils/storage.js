export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return undefined
  }
}

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}

export  const clear = () => {
  localStorage.clear()
}
