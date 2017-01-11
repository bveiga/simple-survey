'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Create a new user  ----------*/
router.post('/create', function (req, res) {
	models.User.create({
		email: req.body.email
	}).then(function (user) {
		res.json(user);
	});
});

/*----------  Get new random question  ----------*/
router.get('/:user_id', function (req, res) {
	var result= [];

	models.Response.findAll({
		where: {
			UserId: req.params.user_id
		}
	}).then(function (responses) {
		/* Get list of question Ids */
		var listResponded = responses.map(function (response) {
			return response.QuestionId;
		});
		
		/* Find all questions not responded */
		models.Question.findAll({
			where: {
				id:  {
					$notIn: listResponded
				}
			}
		}).then(function (questions) {
			/* Get random answered question */
			var randomInt = Math.floor(Math.random() * questions.length),
			randomQuestion = questions[randomInt];
			result.push(randomQuestion);

			/* Get all related answers */
			models.Answer.findAll({
				where: {
					QuestionId: randomQuestion.id
				}
			}).then(function (answers) {
				answers.forEach(function (answer) {
					result.push(answer);
				});
				res.json(result);
			});
		});
	});

});

module.exports = router;
