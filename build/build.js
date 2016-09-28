require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('./config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.js')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)