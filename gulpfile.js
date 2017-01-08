/*====================================
=            Dependencies            =
====================================*/
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');


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
	]
};

var nodemonConfig = {
	script: paths.server,
	ext: 'html js css',
	ignore: ['node_modules']
}


/*==================================
=            Gulp Tasks            =
==================================*/
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

gulp.task('default', ['nodemon', 'watch'], function(){});