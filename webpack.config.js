const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'main.js'),
	output: {
		path: path.join(__dirname, 'src/lib'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}
