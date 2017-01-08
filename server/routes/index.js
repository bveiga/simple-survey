'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  GET home page.  ----------*/
router.get('/', function(req, res) { /* (req, res, next) */
	res.render('index', {
		title: 'Welcome to Simple Survey!'
	});
});

module.exports = router;
