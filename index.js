const moment = require('moment')

exports.main = (req, res) => {
  return moment().format("MMM Do YY")
}
