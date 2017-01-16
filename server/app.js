'use strict';

/*====================================
=            Dependencies            =
====================================*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var answers = require('./routes/answers');
var responses = require('./routes/responses');

var env = process.env.NODE_ENV || 'development';
var config = require( './config.js')[env];

/*==================================================
=            Setup for Express instance            =
==================================================*/

var app = express();

// Use morgan to log requests to the console
app.use(logger('dev'));

// To get info from POST and URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve client pages separately
app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', index);

/* Verify if user is logged in */
app.use(function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token) {
		jwt.verify(token, config.secret, function (error, decoded) {
			if (error) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				/* If verified save so we can use in other routes */
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.json({
			success: false,
			message: 'No token received.'
		});
	}
});

app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/responses', responses);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) { /* (err, req, res, next) */
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json(err);
	// res.render('error');
});

module.exports = app;
