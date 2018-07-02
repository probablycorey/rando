const moment = require('moment')

exports.main = (req, res) => {
  let output = moment().format("MMM Do YY")
  res.send(output)
}
