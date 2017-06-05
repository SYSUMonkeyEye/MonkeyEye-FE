require('./check-versions')()

process.env.NODE_ENV = 'production'

var fs = require('fs')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var allStaticFiles = []
var manifest = 'CACHE MANIFEST\n# version ' + Date.now() + '\n\nCACHE:\n'

function DFS(directory) {
  const files = fs.readdirSync(directory)
  files.forEach(function (file) {
    const state = fs.statSync(path.join(directory, file))
    if (state.isDirectory()) {
      DFS(path.join(directory, file))
    } else {
      var filename = path.join(directory, file)
      var index = filename.lastIndexOf(config.build.assetsSubDirectory)
      allStaticFiles.push(filename.substr(index - 1, filename.length - 1))
    }
  })
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    DFS(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
    allStaticFiles.push(config.rootUrl)
    fs.writeFileSync(path.join(config.build.assetsRoot, 'MonkeyEye.manifest'),
      manifest + allStaticFiles.join('\n') + '\n\nNETWORK:\n*')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
