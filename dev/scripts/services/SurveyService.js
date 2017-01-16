'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.service:SurveyService
 * @description
 * # SurveyService\
 */
angular
.module('simpleSurveyUi')
.factory('SurveyService', ['$http', '$localStorage', function ($http, $localStorage) {

	function getRandomQuestion(callback) {
		var userId = $localStorage.surveyUser.id;
		$http.get('/api/users/'+userId+'/questions').then(function (response) {
			var data = response.data;
			callback(data);
		});
	}

	function createUserResponse(selectedAnswer, callback) {
		var userId = $localStorage.surveyUser.id;

		$http.post(
			'/api/responses/users/'+userId+'/questions/'+selectedAnswer.QuestionId+'/create', {
				option: selectedAnswer.option,
				text: selectedAnswer.text
			}).then(function (res) {
			var data = res.data;
			console.log(data);

			// if(data.response.userId === userId) {
				// callback({ success: true });
			// } else {
				callback({ success: false });
			// }
		});
	}
	
	var service = {};
	service.getRandomQuestion = getRandomQuestion;
	service.createUserResponse = createUserResponse;

	return service;

}]);