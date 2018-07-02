const handlebars = require('handlebars')
const fetch = require('node-fetch')
const fs = require('fs')

let template = fs.readFileSync(__dirname + '/index.html').toString()

exports.main = (req, res) => {
  let searchTerm = req.url.slice(1)
  return gif(searchTerm).then(url => {
    render(res, {
      url: url,
      term: searchTerm,
    })
  })
}

let render = (res, data) => {
  let compiledTemplate = handlebars.compile(template)
  let html = compiledTemplate(data)
  res.send(html)
}

let gif = (search) => {
  let apiKey = 'HAgCZzuX7hV8yhRsJhKy96X7OxOx0nH8'
  let url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json.data[0].url
    })
}