var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
	const htmlWebpackPlugin = helpers.getPluginsByName(
		config,
		'HtmlWebpackPlugin'
	)[0];
	Object.assign(htmlWebpackPlugin.plugin.options.minify, {
		removeComments: false,
		collapseWhitespace: false
	});
	htmlWebpackPlugin.plugin.options.preload = false;
	htmlWebpackPlugin.plugin.options.favicon = false;

	// Required for lingui-macros
	let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
	let babelConfig = rule.options;
	babelConfig.plugins.push('macros');

	if (env.isProd) {
		config.devtool = false; // disable sourcemaps

		// To support chunk loading in root and also /app path
		config.output.publicPath = './';

		// Remove the default hash append in chunk name
		config.output.chunkFilename = '[name].chunk.js';

		config.plugins.push(
			new CommonsChunkPlugin({
				name: 'vendor',
				minChunks: ({ resource }) => /node_modules/.test(resource)
			})
		);

		const swPlugin = helpers.getPluginsByName(
			config,
			'SWPrecacheWebpackPlugin'
		)[0];
		config.plugins.splice(swPlugin.index, 1);

		const uglifyPlugin = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
		config.plugins.splice(uglifyPlugin.index, 1);
	}
}
