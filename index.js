const handlebars = require('handlebars')

exports.main = (req, res) => {
  let compiledTemplate = handlebars.compile('<h1>hi {{name}}</h1>')
  let html = compiledTemplate({
    name: 'corey'
  })
  res.send(html)
}
