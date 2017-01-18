'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.service:AdminService
 * @description
 * # AdminService\
 */
angular
.module('simpleSurveyUi')
.factory('AdminService', ['$http', function ($http) {

	function getQuestionResponses(callback) {
		$http.get('/api/questions/').then(function (res) {
			var data = res.data;
			var parsedData = [];

			data.forEach(function (question) {

				var Answers = [];
				var responseCount = [];
				var totalCount = (question.Responses).length;

				(question.Answers).forEach(function (answer) {
					responseCount[answer.option] = 0;

					(question.Responses).forEach(function (response) {
						responseCount[response.option]++;
					});

					Answers.push({
						id: answer.id,
						option: answer.option,
						text: answer.text,
						count: responseCount[answer.option]
					});
				});

				parsedData.push({
					id: question.id,
					text: question.text,
					total: totalCount,
					Answers: Answers
				});
			});

			callback(parsedData);
		});
	}

	function createQuestion(question, callback) {
		$http.get('/api/questions/create', {
			text: question.text,
			answer1: question.answer1,
			answer2: question.answer2,
			answer3: question.answer3,
			answer4: question.answer4
		} ,function(res) {
			var result = {};

			if (res.data.success) {
				result.success = true;
			} else {
				result.success = false;
				result.message = 'Failed to create question. Please try again later.';
			}

			callback(result);
		});
	}
	
	var service = {};
	service.getQuestionResponses = getQuestionResponses;
	service.createQuestion = createQuestion;

	return service;

}]);