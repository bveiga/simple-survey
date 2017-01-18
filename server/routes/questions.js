'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get all questions and responses  ----------*/
router.get('/', function (req, res) {
	models.Question.findAll({
		include: [
			{model: models.Answer, as: 'Answers'},
			{model: models.Response, as: 'Responses'}
		]
	}).then(function (questions) {
		res.json(questions);
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

/*----------  Create a new question  ----------*/
router.post('/create', function (req, res) {
	models.Question.create({
		text: req.body.text
	}).then(function (question) {
		models.Answer.bulkCreate([
			{ option: 1, text: req.body.answer1, QuestionId: question.id },
			{ option: 2, text: req.body.answer2, QuestionId: question.id },
			{ option: 3, text: req.body.answer3, QuestionId: question.id },
			{ option: 4, text: req.body.answer4, QuestionId: question.id }
		]).then(function () {
			res.json(question);
		}).catch(function (error) {
			res.status(500).json(error);
		});
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

module.exports = router;
