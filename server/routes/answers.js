'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get all answers  ----------*/
router.get('/', function(req, res) {
	models.Answer.findAll({}).then(function(answers) {
		res.json(answers);
	});
});

/*----------  Create a new answer  ----------*/
router.post('/questions/:question_id/create', function(req, res) {
	models.Answer.create({
		option: req.body.option,
		text: req.body.text,
		QuestionId: req.params.question_id
	}).then(function(answer) {
		res.json(answer);
	});
});

module.exports = router;
