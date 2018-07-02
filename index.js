const moment = require('momemnt')

exports.main = (req, res) => {
  return moment().format("MMM Do YY")
}
