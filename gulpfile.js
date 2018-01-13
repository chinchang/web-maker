/*eslint-env node*/

var gulp = require('gulp');
var useref = require('gulp-useref');

gulp.task('copyFiles', [], function() {
	gulp.src('src/lib/codemirror/theme/*').pipe(gulp.dest('app/lib/codemirror/theme'));
	gulp.src('src/lib/codemirror/mode/**/*').pipe(gulp.dest('app/lib/codemirror/mode'));
	gulp.src('src/partials/*').pipe(gulp.dest('app/partials'));
	gulp.src('src/lib/screenlog.js').pipe(gulp.dest('app/lib'));
	gulp.src('src/icon-48.png').pipe(gulp.dest('app'));
	gulp.src([ 'src/FiraCode.ttf', 'src/Fixedsys.ttf', 'src/Inconsolata.ttf', 'src/Monoid.ttf' ]).pipe(gulp.dest('app'));
});

gulp.task('useRef', [ 'copyFiles' ], function() {
	return gulp.src('src/index.html').pipe(useref()).pipe(gulp.dest('app'));
});

gulp.task('generate-service-worker', [ 'useRef' ], function(callback) {
	var swPrecache = require('sw-precache');
	var rootDir = 'app';

	swPrecache.write(
		`${rootDir}/service-worker.js`,
		{
			staticFileGlobs: [
				rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'
			],
			stripPrefix: `${rootDir}/`
		},
		callback
	);
});

gulp.task('default', ['generate-service-worker']);
