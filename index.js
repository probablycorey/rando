const handlebars = require('handlebars')
const fs = require('fs')

exports.main = (req, res) => {
  let template = fs.readFileSync(__dirname + '/index.html').toString()
  let compiledTemplate = handlebars.compile(template)
  let html = compiledTemplate({
    name: 'corey',
    url: JSON.stringify(req.url, null, 2),
    params: JSON.stringify(req.params, null, 2),
    query: JSON.stringify(req.query, null, 2),
    route: JSON.stringify(req.route, null, 2),
  })
  res.send(html)
}
