/*eslint-env node*/

const fs = require('fs');
const gulp = require('gulp');
const useref = require('gulp-useref');
const cleanCSS = require('gulp-clean-css');
const babelMinify = require('babel-minify');

function minifyJs(fileName) {
	const content = fs.readFileSync(fileName, "utf8");
	const minifiedContent = babelMinify(content).code;
	fs.writeFileSync(fileName, minifiedContent);
	console.log(`[${fileName}]: ${content.length}kb -> ${minifiedContent.length}kb`)
}
gulp.task('copyFiles', [], function() {
	gulp
		.src('src/lib/codemirror/theme/*')
		.pipe(gulp.dest('app/lib/codemirror/theme'));
	gulp
		.src('src/lib/codemirror/mode/**/*')
		.pipe(gulp.dest('app/lib/codemirror/mode'));
	gulp
		.src('src/lib/transpilers/*')
		.pipe(gulp.dest('app/lib/transpilers'));
	gulp.src('src/partials/*').pipe(gulp.dest('app/partials'));
	gulp.src('src/lib/screenlog.js').pipe(gulp.dest('app/lib'));
	gulp.src('src/icon-48.png').pipe(gulp.dest('app'));
	gulp
		.src([
			'src/FiraCode.ttf',
			'src/Fixedsys.ttf',
			'src/Inconsolata.ttf',
			'src/Monoid.ttf'
		])
		.pipe(gulp.dest('app'));
});

gulp.task('useRef', ['copyFiles'], function() {
	return gulp
		.src('src/index.html')
		.pipe(useref())
		.pipe(gulp.dest('app'));
});

gulp.task('minify', ['useRef'], function() {
	minifyJs('app/script.js');
	minifyJs('app/vendor.js');
	minifyJs('app/lib/screenlog.js');

	gulp.src('app/*.css')
		.pipe(cleanCSS({ debug: true }, (details) => {
			console.log(`${details.name}: ${details.stats.originalSize}`);
			console.log(`${details.name}: ${details.stats.minifiedSize}`);
		}))
		.pipe(gulp.dest('app'));
});

gulp.task('generate-service-worker', ['minify'], function(callback) {
	var swPrecache = require('sw-precache');
	var rootDir = 'app';

	swPrecache.write(
		`${rootDir}/service-worker.js`,
		{
			staticFileGlobs: [
				rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'
			],
			stripPrefix: `${rootDir}/`,

			// has to be increased to around 2.8mb for sass.worker.js
			maximumFileSizeToCacheInBytes: 2900000
		},
		callback
	);
});

gulp.task('default', ['generate-service-worker']);
