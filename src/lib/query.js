const searchObj = () => {
  let search = window.location.search
  let obj = {}

  if (search) {
    const arr = search.substring(1).split('&')
    arr.forEach(item => {
      const temp = item.split('=')
      obj[temp[0]] = temp[1]
    })
  }

  return obj
}

const setQuery = (key, value) => {
  const query = searchObj()
  query[key] = encodeURIComponent(value)
  const arr = []

  Object.keys(query).forEach(item => arr.push(`${item}=${query[item]}`))
  window.location.search = `?${arr.join('&')}`
}

const getQuery = (key) => {
  const query = searchObj()

  if (!isEmptyObject(query)) {
    return decodeURIComponent(query[key])
  }

  return ''
}

const isEmptyObject = (obj) => {
  for (let i in obj) {
    if (i) return false
  }

  return true
}

export default {
  getQuery,
  setQuery,
  query: searchObj,
}