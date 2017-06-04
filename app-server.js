const port = 8080
const express = require('express')
const path = require('path')
const fs = require('fs')
const compression = require('compression')

const index = fs.readFileSync(path.join(__dirname, './dist/index.html'))

let app = express()

app.use(compression())
app.use('/static/js', express.static(path.join(__dirname, './dist/static/js')))
app.use('/static/css', express.static(path.join(__dirname, './dist/static/css')))

app.use('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(index)
})

app.listen(port)

console.log('http://localhost:' + port)
