import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
	const isProd = mode === 'production';

	return {
		plugins: [preact()],

		// HTML template configuration
		root: 'src',

		build: {
			outDir: '../build',
			emptyOutDir: true,

			// Equivalent to --no-inline-css
			cssCodeSplit: true,

			// Remove hash from chunk names and maintain bundle naming (matching preact.config.js and gulpfile expectations)
			rollupOptions: {
				output: {
					entryFileNames: 'bundle.[hash].js',
					chunkFileNames: '[name].chunk.js',
					assetFileNames: assetInfo => {
						const info = assetInfo.name.split('.');
						const ext = info[info.length - 1];
						if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
							return `[name].[ext]`;
						}
						if (ext === 'css') {
							return 'style.[hash].css';
						}
						return `assets/[name].[hash].[ext]`;
					}
				}
			},

			// Disable sourcemaps in production (matching preact.config.js)
			sourcemap: !isProd,

			// Public path configuration
			assetsDir: isProd ? 'assets' : 'assets'
		},

		// Base path configuration (matching the EJS template logic)
		base: isProd ? '/create/' : '/',

		// Server configuration for development
		server: {
			port: 8080,
			host: true
		},

		// Define global constants (replacing webpack DefinePlugin functionality)
		define: {
			'process.env.NODE_ENV': JSON.stringify(mode)
		},

		// Resolve configuration
		resolve: {
			alias: {
				react: 'preact/compat',
				'react-dom': 'preact/compat',
				'react-addons-css-transition-group': 'preact-css-transition-group'
			}
		}
	};
});
