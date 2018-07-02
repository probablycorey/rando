const moment = require('moment')

exports.main = (req, res) => {
  return moment().format("[THE DATE IS] MMM Do YY")
}
