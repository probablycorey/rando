module.exports = (obj) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      return `${key}: ${value}`
    })
    .join('\n')
}