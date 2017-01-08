'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Create a new user  ----------*/
router.post('/create', function(req, res) {
	models.User.create({
		email: req.body.email
	}).then(function(user) {
		res.json(user);
	});
});

module.exports = router;
