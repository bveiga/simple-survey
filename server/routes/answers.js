'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get all answers  ----------*/
router.get('/', function (req, res) {
	models.Answer.findAll({}).then(function (answers) {
		res.json(answers);
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

/*----------  Get all answers for 1 question  ----------*/
router.get('/questions/:question_id', function (req, res) {
	models.Answer.findAll({
		where: {
			QuestionId: req.params.question_id
		}
	}).then(function (answers) {
		res.json(answers);
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

module.exports = router;
