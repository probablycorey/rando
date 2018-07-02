const handlebars = require('handlebars')
const fs = require('fs')

exports.main = (req, res) => {
  let template = fs.readFileSync(__dirname + '/index.html').toString()
  let compiledTemplate = handlebars.compile(template)
  let html = compiledTemplate({
    name: 'corey',
    req: req
  })
  res.send(html)
}
