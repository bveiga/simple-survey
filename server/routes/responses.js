'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get all responses  ----------*/
router.get('/', function(req, res) {
	models.Response.findAll({}).then(function(responses) {
		res.json(responses);
	});
});

/*----------  Create a new response  ----------*/
router.post('/users/:user_id/questions/:question_id/create', function(req, res) {
	models.Response.create({
		userInput: req.body.userInput,
		UserId: req.params.user_id,
		QuestionId: req.params.question_id
	}).then(function(responses) {
		res.json(responses);
	});
});

module.exports = router;
