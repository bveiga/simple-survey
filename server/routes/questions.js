'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get all questions  ----------*/
router.get('/', function (req, res) {
	models.Question.findAll({}).then(function (questions) {
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
		res.json(question);
	}).catch(function (error) {
		res.status(500).json(error);
	});
});

module.exports = router;