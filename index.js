const handlebars = require('handlebars')
const fs = require('fs')

exports.main = (req, res) => {
  let template = fs.readFileSync(__dirname + '/index.html')
  // let compiledTemplate = handlebars.compile('<h1>hi {{name}}</h1>')
  // let html = compiledTemplate({
  //   name: 'corey'
  // })
  res.send(template)
  let
}
