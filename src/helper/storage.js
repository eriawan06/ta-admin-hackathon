const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
  } catch (err) {
    return null
  }
}

const deleteStorage = (key) => {
  localStorage.removeItem(key)
}

const clearStorage = () => {
  localStorage.clear()
}

export default { setStorage, getStorage, deleteStorage, clearStorage }
