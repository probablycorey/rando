module.exports = (obj) => {
  return Object.keys(obj)
    .map(key => {
      let value = obj[key]
      return `${key}: ${value}`
    })
    .join('\n')
}