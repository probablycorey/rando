module.exports = (obj) => {
  return Object.keys(obj)
    .map(key => {
      let value = obj[key]
      if (typeof value === 'object') {
        return `${key}: ${Object.keys(value)}}`
      } else {
        return `${key}: ${value}`
      }
      
    })
    .join('\n')
}