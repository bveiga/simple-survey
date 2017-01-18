/*====================================
=            Dependencies            =
====================================*/
var gulp		= require('gulp');
var sass		= require('gulp-sass');
var concat		= require('gulp-concat');
var uglify		= require('gulp-uglify');
var jshint		= require('gulp-jshint');
var nodemon		= require('gulp-nodemon');
var del			= require('del');


/*===============================
=            Configs            =
===============================*/

var paths = {
	client: {
		styles: 'client/styles/*.css',
		scripts: 'client/scripts/*.js'
	},
	dev: {
		styles: 'dev/styles/*.scss',
		scripts: 'dev/scripts/**/*.js'
	},
	vendor: {
		styles: 'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
		scripts: [
			'node_modules/jquery/dist/jquery.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'node_modules/angular/angular.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-sanitize/angular-sanitize.js',
			'node_modules/ngstorage/ngStorage.js'
		]
	},
	server: './server/bin/www'
};

var nodemonConfig = {
	script: paths.server,
	ext: 'html js css',
	ignore: ['node_modules']
}


/*==================================
=            Gulp Tasks            =
==================================*/

/*----------  Delete processed files  ----------*/
gulp.task('clean', function (cb) {
	del([
		paths.client.styles,
		paths.client.scripts
	], {force: true}, cb);
});

/*----------  Concatenate all js files  ----------*/
gulp.task('scripts', function () {
	return gulp.src(paths.dev.scripts)
		.pipe(concat('client.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/scripts'));
});

/*----------  Compile Sass files and concatenate  ----------*/
gulp.task('styles', function () {
	return gulp.src(paths.dev.styles)
		.pipe(concat('client.scss'))
		.pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
		.pipe(gulp.dest('client/styles'));
});

/*----------  Copy & concatenate libraries  ----------*/
gulp.task('vendor-scripts', function () {
	return gulp.src(paths.vendor.scripts)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('client/scripts'));
});
gulp.task('vendor-styles', function () {
	return gulp.src(paths.vendor.styles)
		.pipe(concat('vendor.scss'))
		.pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
		.pipe(gulp.dest('client/styles'));
});

gulp.task('lint', function () {
	return gulp.src(paths.client.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon(nodemonConfig)
	.on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});

gulp.task('watch', function () {
	gulp.watch(paths.client.scripts, ['lint']);
});

gulp.task(
	'build', [
		'clean',
		'scripts',
		'vendor-scripts',
		'styles',
		'vendor-styles'
	]
);

gulp.task(
	'default', [
		'build',
		'nodemon'
	]
);
