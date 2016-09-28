module.exports = {
	port: 8000,
	deep: 600,
	build: {
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath: '/',
		assetsSubDirectory: 'static'
	},
	dev: {
		assetsPublicPath: '/',
		assetsSubDirectory: 'static'
	}
};