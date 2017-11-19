var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var minifyCSS = require('gulp-csso');
var useref = require('gulp-useref');

gulp.task('css', function() {
	return gulp
		.src([
			'src/lib/codemirror/lib/codemirror.css',
			'src/lib/codemirror/addon/hint/show-hint.css',
			'src/lib/codemirror/addon/fold/foldgutter.css',
			'src/lib/hint.min.css',
			'src/lib/inlet.css',
			'src/style.css'
		])
		.pipe(concat('build.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('src'));
});

gulp.task('useRef', [], function() {
	return gulp.src('src/index.html').pipe(useref()).pipe(gulp.dest('app'));
});

gulp.task('generate-service-worker', ['useRef'], function(callback) {
	var swPrecache = require('sw-precache');
	var rootDir = 'app';

	swPrecache.write(
		`${rootDir}/service-worker.js`,
		{
			staticFileGlobs: [
				rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'
			],
			stripPrefix: rootDir
		},
		callback
	);
});

gulp.task('default', ['generate-service-worker']);
