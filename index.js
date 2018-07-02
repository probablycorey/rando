import momemnt from 'moment'

exports.main = (req, res) => {
  return moment().format("MMM Do YY");
}
