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
		var auth = $localStorage.surveyUser;
		$http.get('/api/users/'+auth.id+'/questions').then(function (response) {
			var data = response.data;
			callback(data);
		});
	}

	function createUserResponse(selectedAnswer, callback) {
		var auth = $localStorage.surveyUser;

		$http.post(
			'/api/responses/users/'+auth.id+'/questions/'+selectedAnswer.QuestionId+'/create', {
				option: selectedAnswer.option,
				text: selectedAnswer.text
			}).then(function (res) {
			var data = res.data;
			console.log(data);

			if(data.response.UserId === auth.id) {
				callback({ success: true });
			} else {
				callback({ success: false });
			}
		});
	}
	
	var service = {};
	service.getRandomQuestion = getRandomQuestion;
	service.createUserResponse = createUserResponse;

	return service;

}]);