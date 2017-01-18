'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/*----------  Get new random question  ----------*/
router.get('/:user_id/questions', function (req, res) {
	var result= {};

	/* Moved method here because Sequelize 2.x cannot handle
		'where' calls with empty arrays */
	function getUnrespondedQuestions(questions) {
		/* If there aren't any unresponded questions... */
		if(questions.length === 0) {
			result.success = false;
			res.json(result);
		} else {
			/* Get random unanswered question */
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
	}

	models.Response.findAll({
		where: {
			UserId: req.params.user_id
		}
	}).then(function (responses) {

		/* Get list of question Ids */
		if(responses.length > 0) {
			var listResponded = [];
			listResponded = responses.map(function (response) {
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
				/* Get random question from unresponded questions */
				getUnrespondedQuestions(questions);
			}).catch(function (error) {
				res.status(500).json(error);
			});
		} else {
			models.Question.findAll({}).then(function (questions) {
				/* Get random question from list of all questions */
				getUnrespondedQuestions(questions);
			}).catch(function (error) {
				res.status(500).json(error);
			});
		}
		
	}).catch(function (error) {
		res.status(500).json(error);
	});

});

module.exports = router;
