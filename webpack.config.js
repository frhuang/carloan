var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var common = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist',
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
				loader: 'babel',
				exclude: /node_modules/
			},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?{browsers:["> 1%", "Firefox 15"]}')
      }, 
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!autoprefixer-loader?{browsers:["> 1%", "Firefox 15"]}')
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
					limit: 81920,
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

if(process.env.NODE_ENV === 'development') {
	module.exports = merge(common, {
		devServer: {
			historyApiFallback: true,
			noInfo: true
		},
		devtool: '#eval-source-map',
		plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify("development")
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
		]
	})
}

if(process.env.NODE_ENV === 'production') {
	module.exports = merge(common, {
		devtool: '#source-map',
		vue: {
			loader: {
				css: ExtractTextPlugin.extract('css!autoprefixer?{browsers:["> 1%", "Firefox 15"]}'),
        scss: ExtractTextPlugin.extract('css!sass!autoprefixer?{browsers:["> 1%", "Firefox 15"]}')
			}
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
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