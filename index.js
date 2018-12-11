const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.get('/:page?', (req, res) => {
  res.sendFile(`/${req.params.page}`)
})


app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
})