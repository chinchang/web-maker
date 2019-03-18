/*eslint-env node*/

const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const useref = require('gulp-useref');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babelMinify = require('babel-minify');
const child_process = require('child_process');
const merge = require('merge-stream');
const zip = require('gulp-zip');
var packageJson = JSON.parse(fs.readFileSync('./package.json'));
const connect = require('gulp-connect');

function minifyJs(fileName) {
	const content = fs.readFileSync(fileName, 'utf8');
	const minifiedContent = babelMinify(
		content,
		{ mangle: content.length < 700000 },
		{ sourceMaps: false }
	).code;
	fs.writeFileSync(fileName, minifiedContent);
	console.log(
		`[${fileName}]: ${content.length / 1024}K -> ${minifiedContent.length /
			1024}K`
	);
}
gulp.task('runWebpack', function() {
	return child_process.execSync('yarn run build');
});

gulp.task('copyFiles', function() {
	return merge(
		gulp
			.src('src/lib/codemirror/theme/*')
			.pipe(gulp.dest('app/lib/codemirror/theme')),
		gulp
			.src('src/lib/codemirror/mode/**/*')
			.pipe(gulp.dest('app/lib/codemirror/mode')),
		gulp.src('src/lib/transpilers/*').pipe(gulp.dest('app/lib/transpilers')),
		gulp.src('src/lib/prettier-worker.js').pipe(gulp.dest('app/lib/')),
		gulp.src('src/lib/prettier/*').pipe(gulp.dest('app/lib/prettier')),
		gulp
			.src(['!src/lib/monaco/monaco.bundle.js', 'src/lib/monaco/**/*'])
			.pipe(gulp.dest('app/lib/monaco')),
		gulp.src('src/lib/screenlog.js').pipe(gulp.dest('app/lib')),
		gulp.src('icons/*').pipe(gulp.dest('app/icons')),
		gulp.src('src/assets/*').pipe(gulp.dest('app/assets')),
		gulp.src('src/templates/*').pipe(gulp.dest('app/templates')),
		gulp.src('preview/*').pipe(gulp.dest('app/preview')),
		gulp
			.src([
				'src/preview.html',
				'src/detached-window.js',
				'src/icon-48.png',
				'src/icon-128.png',
				'manifest.json'
			])
			.pipe(gulp.dest('app')),

		gulp
			.src('build/bundle.*.js')
			.pipe(rename('script.js'))
			.pipe(gulp.dest('app')),
		gulp
			.src('build/vendor.*.js')
			.pipe(rename('vendor.js'))
			.pipe(gulp.dest('app')),
		gulp.src('build/monaco.*.js').pipe(gulp.dest('app')),

		// Following CSS are copied to build/ folder where they'll be referenced by
		// useRef plugin to concat into one.
		gulp
			.src('src/lib/codemirror/lib/codemirror.css')
			.pipe(gulp.dest('build/lib/codemirror/lib')),
		gulp
			.src('src/lib/codemirror/addon/hint/show-hint.css')
			.pipe(gulp.dest('build/lib/codemirror/addon/hint')),
		gulp
			.src('src/lib/codemirror/addon/fold/foldgutter.css')
			.pipe(gulp.dest('build/lib/codemirror/addon/fold')),
		gulp
			.src('src/lib/codemirror/addon/dialog/dialog.css')
			.pipe(gulp.dest('build/lib/codemirror/addon/dialog')),
		gulp.src('src/lib/hint.min.css').pipe(gulp.dest('build/lib')),
		gulp.src('src/lib/inlet.css').pipe(gulp.dest('build/lib')),
		gulp.src('src/style.css').pipe(gulp.dest('build')),

		gulp
			.src([
				'src/FiraCode.ttf',
				'src/FixedSys.ttf',
				'src/Inconsolata.ttf',
				'src/Monoid.ttf'
			])
			.pipe(gulp.dest('app'))
	);
});

gulp.task('useRef', function() {
	return gulp
		.src('build/index.html')
		.pipe(useref())
		.pipe(gulp.dest('app'));
});

gulp.task('concatSwRegistration', function() {
	return gulp
		.src(['src/service-worker-registration.js', 'app/script.js'])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('app'));
});

gulp.task('minify', function() {
	minifyJs('app/script.js');
	minifyJs('app/vendor.js');
	minifyJs('app/lib/screenlog.js');

	return gulp
		.src('app/*.css')
		.pipe(
			cleanCSS(
				{
					debug: true
				},
				details => {
					console.log(
						`${details.name}: ${details.stats.originalSize} 👉🏼  ${
							details.stats.minifiedSize
						}`
					);
				}
			)
		)
		.pipe(gulp.dest('app'));
});

gulp.task('fixIndex', function() {
	var contents = fs.readFileSync('build/index.html', 'utf8');
	// Replace hashed-filename script tags with unhashed ones
	contents = contents.replace(
		/\<\!\-\- SCRIPT-TAGS \-\-\>[\S\s]*?\<\!\-\- END-SCRIPT-TAGS \-\-\>/,
		'<script defer src="vendor.js"></script><script defer src="script.js"></script>'
	);

	// vendor.hash.js gets created outside our markers, so remove it
	contents = contents.replace(
		/\<script src="[\S\s]*?vendor\.[\S\s]*?\<\/script\>/,
		''
	);

	fs.writeFileSync('build/index.html', contents, 'utf8');
});

gulp.task('generate-service-worker', function(callback) {
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

gulp.task('packageExtension', function() {
	child_process.execSync('rm -rf extension');
	child_process.execSync('cp -R app extension');
	child_process.execSync('cp src/manifest.json extension');
	child_process.execSync('cp src/options.js extension');
	child_process.execSync('cp src/options.html extension');
	child_process.execSync('cp src/eventPage.js extension');
	child_process.execSync('cp src/icon-16.png extension');
	child_process.execSync('rm -rf extension/service-worker.js');
	return merge(
		gulp
			.src('build/bundle.*.js')
			.pipe(rename('script.js'))
			.pipe(gulp.dest('extension')),

		gulp
			.src('extension/**/*')
			.pipe(zip(`extension-${packageJson.version}.zip`))
			.pipe(gulp.dest('./'))
	);
});

gulp.task('buildWebsite', function() {
	return child_process.execSync('yarn run build-website');
});

gulp.task('buildDistFolder', function() {
	child_process.execSync('rm -rf dist');
	child_process.execSync('mv packages/website/_site dist');
	child_process.execSync('mv app dist/');
});

gulp.task('cleanup', function() {
	return child_process.execSync('rm -rf build');
});

gulp.task('start-preview-server', function() {
	connect.server({
		root: 'preview',
		port: 7888,
		https: false
	});
});

gulp.task('release', function(callback) {
	runSequence(
		['runWebpack', 'buildWebsite'],
		'copyFiles',
		'fixIndex',
		'useRef',
		'concatSwRegistration',
		'minify',
		'generate-service-worker',
		// 'packageExtension',
		'buildDistFolder',
		'cleanup',
		function(error) {
			if (error) {
				console.log(error.message);
			} else {
				console.log('RELEASE FINISHED SUCCESSFULLY');
			}
			callback(error);
		}
	);
});

gulp.task('dev-release', function(callback) {
	runSequence(
		['runWebpack', 'buildWebsite'],
		'copyFiles',
		'fixIndex',
		'useRef',
		'concatSwRegistration',
		'generate-service-worker',
		'buildDistFolder',
		'cleanup',
		function(error) {
			if (error) {
				console.log(error.message);
			} else {
				console.log('DEV RELEASE FINISHED SUCCESSFULLY');
			}
			callback(error);
		}
	);
});
