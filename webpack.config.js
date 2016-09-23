var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var common = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './public'),
		publicPath: '/public',
		filename: 'build.js'
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'bebel',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.html$/,
				loader: 'vue-html'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=50000&name=[path][name].[ext]'
			}
		]
	}
}

if(process.env.NODE_ENV === 'build') {
	module.exports = merge(common, {
		devServer: {
			historyApiFallback: true,
			noInfo: true
		},
		devtool: '#eval-source-map',
		plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
      })
		]
	})
}

if(process.env.NODE_ENV === 'production') {
	module.exports = merge(common, {
		devtool: '#source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				output: {
					comments: false
				},
				compress: {
					warning: false
				}
			}),
			new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
      })
		]
	})
}