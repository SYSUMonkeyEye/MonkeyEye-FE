const port = 8080
const express = require('express')
const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./config')
const fs = require('fs')
const compression = require('compression')

const index = path.join(__dirname, './dist/index.html')
const js = path.join(__dirname, './dist/static/js')
const css = path.join(__dirname, './dist/static/css')
const manifest = path.join(__dirname, './dist/MonkeyEye.manifest')

let app = express()

app.use(compression())
app.use(config.rootUrl, express.static(index))
app.use('/static/js', express.static(js))
app.use('/static/css', express.static(css))
app.use('/MonkeyEye.manifest', express.static(manifest))
app.use('/*/MonkeyEye.manifest', express.static(manifest))
app.use('/api', proxyMiddleware({target: config.apiServer, changeOrigin: true}))
app.use('/static', proxyMiddleware({target: config.assetsServer, changeOrigin: true}))

app.use('*', (req, res) => {
  res.redirect('/app')
})

app.listen(port)

console.log('http://localhost:' + port)
