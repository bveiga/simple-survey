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

			/* Create new user if one doesn't exist */
			models.User.create({
				email: req.body.email,
				password: req.body.password
			}).then(function (newUser) {

				if(!newUser) {
					res.json({
						success: false,
						message:'Register failed. Please try again later.'
					});
				} else {
					var registerToken = 'Bearer '+
					jwt.sign({ email: newUser.email }, config.secret , {
						expiresIn: '24h'
					});

					res.json({
						id: newUser.id,
						success: true,
						message: 'Got the secret token!',
						token: registerToken
					});
				}
			}).catch(function (error) {
				res.status(500).json(error);
			});
		} else if (user) {
			/* Check password */
			if(user.password !== req.body.password) {
				res.json({
					success: false,
					message:'Login failed. Wrong password.'
				});
			} else {
				var loginToken = jwt.sign({
					email: user.email,
					isAdmin: user.isAdmin
				}, config.secret , {
					expiresIn: '24h'
				});

				res.json({
					id: user.id,
					isAdmin: user.isAdmin,
					success: true,
					message: 'Got the secret token!',
					token: loginToken
				});
			}
		}
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

module.exports = router;
