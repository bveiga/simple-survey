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
	
	var service = {};
	service.getRandomQuestion = getRandomQuestion;

	return service;

}]);