'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

var env = process.env.NODE_ENV || 'development';
var config = require( '../config.js')[env];
var jwt = require('jsonwebtoken');

/*----------  GET home page.  ----------*/
router.get('/', function (req, res) { /* (req, res, next) */
	res.status(404).send('Nothing to see here, move along...');
});

/*----------  Register a new user  ----------*/
router.post('/create', function (req, res) {
	models.User.create({
		email: req.body.email,
		password: req.body.password
	}).then(function (user) {
		res.json(user);
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

/*----------  Login authentication  ----------*/
router.post('/authenticate', function (req, res) {
	models.User.find({
		where: {
			email: req.body.email
		}
	}).then(function (user) {
		if(!user) {
			res.json({
				success: false,
				message:'Login failed. User not found.'
			});
		} else if (user) {
			/* Check password */
			if(user.password !== req.body.password) {
				res.json({
					success: false,
					message:'Login failed. Wrong password.'
				});
			} else {
				var token = jwt.sign({ email: user.email }, config.secret , {
					expiresIn: '24h'
				});

				res.json({
					success: true,
					message: 'Got the secret token!',
					token: token
				});
			}
		}
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

module.exports = router;
