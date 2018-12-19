// index.js
const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.get('/', (req, res) => {
    res.send('<h1><marquee direction=right>Hello from the outside!! At least I can say that I&#39;ve tried!</marquee></h1>')
    res.end()
})

app.listen(port, err => {
    if (err) throw err
    console.log(`>> Ready On Server http://localhost:${port}`)
})