var debug = require('debug')('myApp:server')
var express = require('express')
var path = require('path')
var proxy = require('http-proxy-middleware')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev')
var open = require('open')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./config')
var serverConfig = require('../server/config')
var nodemon = require('nodemon')

var app = express();
var compiler = webpack(webpackConfig)
var times = 2;
var port = process.env.PORT || config.port;

var devMiddleware = webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
})

var hotMiddleware = webpackHotMiddleware(compiler)

compiler.plugin('compilation', function(compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
		hotMiddleware.publish({
			action: 'reload'
		});
		cb();
	})		
});

nodemon({
	verbose: true,
	script: './server/www',
	ignore: ['src/', 'node_modules'],
	watch: ['./server'],
	env: {
		NODE_ENV: "development"
	},
	ext: "js"
}).on('start', function(err) {
	if(err) {
		console.log(err);
	}
}).on('restart', function() {
	console.log('nodemon restart...')
	setTimeout(function() {
		hotMiddleware.publish({
			action: 'reload'
		})
	}, config.deep)
})

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);

app.use('/', proxy({
	target: 'http://localhost:' + serverConfig.port,
	changeOrigin: true
}));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	err.status = err.status || 500;
	res.json(err);
});

app.listen(config.port, function(err) {
	if(err) {
		return;
	}
	openBrowser();
})

function openBrowser() {
	times --;
	if(times) {
		return;
	}
	open('http://localhost:' + config.port);
}