'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get new random question  ----------*/
router.get('/:user_id/questions', function (req, res) {
	var result= {};

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

			/* If there aren't any unresponded questions... */
			if(questions.length === 0) {
				result.success = false;
				res.json(result);
			} else {
				/* Get random answered question */
				var randomInt = Math.floor(Math.random() * questions.length),
				randomQuestion = questions[randomInt];
				result.question = randomQuestion;

				/* Get all related answers */
				models.Answer.findAll({
					where: {
						QuestionId: randomQuestion.id
					}
				}).then(function (answers) {
					result.answers = [];
					if(answers.length === 0) {
						result.success = false;
					} else {
						result.success = true;
						answers.forEach(function (answer) {
							result.answers.push(answer);
						});
					}
					
					res.json(result);
				}).catch(function (error) {
					res.status(500).json(error);
				});
			}

		}).catch(function (error) {
			res.status(500).json(error);
		});
	}).catch(function (error) {
		res.status(500).json(error);
	});

});

module.exports = router;
