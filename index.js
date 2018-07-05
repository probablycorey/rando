const handlebars = require('handlebars')
const fetch = require('node-fetch')
const fs = require('fs')

let template = fs.readFileSync(__dirname + '/index.html').toString()

exports.main = (req, res) => {
  console.log(req.hostname, req.path, req.rawBody)
  if (req.url.match(/\/\w+\.(html|css)/)) {
    let fileName = req.url.slice(1)
    console.log(`rendering file ${fileName}`)
    res.sendFile(fileName, {root: __dirname})
  } else {
    let searchTerm = req.body.term
    console.log(`rendering gif for ${searchTerm}`)
    return renderGif(res, searchTerm)
  }
}

let renderGif = (res, searchTerm) => {
  return gif(searchTerm).then(url => {
    let compiledTemplate = handlebars.compile(template)
    let html = compiledTemplate({
      url: url,
      term: searchTerm,
      baseUrl: "https://us-central1-vocal-circle-196621.cloudfunctions.net/probablycoreyRandoMaster"
    })
    res.send(html)
  })

}

let gif = (search) => {
  let apiKey = 'HAgCZzuX7hV8yhRsJhKy96X7OxOx0nH8'
  let url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      let url = json.data[0] ? json.data[0].images.original.url : null
      return url
    })
}