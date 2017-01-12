/*====================================
=            Dependencies            =
====================================*/
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var del = require('del');


/*===============================
=            Configs            =
===============================*/
var paths = {
	styles: [
		'./client/css/*.css',
	],
	scripts: [
		'./client/js/*.js',
	],
	server: [
		'./server/bin/www'
	],
	vendor: {
		styles: 'node_modules/bootstrap/dist/css/bootstrap.css',
		scripts: 'node_modules/angular/angular.js'
	}
};

var nodemonConfig = {
	script: paths.server,
	ext: 'html js css',
	ignore: ['node_modules']
}


/*==================================
=            Gulp Tasks            =
==================================*/
gulp.task('clean', function (cb) {
	del(['client/vendor/**/*'], {force: true}, cb);
});

gulp.task('lint', function () {
	return gulp.src(paths.scripts)
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
	gulp.watch(paths.scripts, ['lint']);
});

gulp.task('vendor', function () {
	return gulp.src(paths.vendor.styles)
		.pipe(gulp.src(paths.vendor.scripts))
		.pipe(gulp.dest('client/vendor'));
});

gulp.task(
	'default', [
		'clean',
		'vendor',
		'nodemon',
		'watch'
	]
);