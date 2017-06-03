const port = 8080
const express = require('express')
const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./config')

let app = express()

app.use('/static/js', express.static(path.join(__dirname, './dist/static/js')))
app.use('/static/css', express.static(path.join(__dirname, './dist/static/css')))
app.use(proxyMiddleware('/api', { target: config.apiServer }))
app.use(proxyMiddleware('/static', { target: config.assetsServer }))
app.use('/dist/index.html', express.static(path.join(__dirname, './dist/index.html')))
app.use('*', (req, res) => {
  res.redirect('/dist/index.html')
})

app.listen(port)

console.log("http://localhost:" + port)
