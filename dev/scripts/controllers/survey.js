'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.controller:SurveyController
 * @description
 * # SurveyController
 * Controller of the simpleSurveyUi
 */
angular
.module('simpleSurveyUi')
.controller('SurveyController', [
	'$scope',
	'$location',
	'SurveyService',
	'Page',
function ($scope, $location, SurveyService, Page) {
	Page.setTitle('Simple Survey | Welcome');
	Page.setLH(true);

	$scope.question = {};
	$scope.listOfAnswers = {};

	SurveyService.getRandomQuestion(function (result) {
		if(result.success === true) {
			if(result.answers.length > 0) {
				$scope.question = result.question;
				$scope.listOfAnswers = result.answers;
			} else {
				$scope.question = {text: 'Looks like you\'ve answered all our questions.'};
			}
		} else {
			$scope.question = {text: 'Looks like you\'ve answered all our questions.'};
		}
	});
}]);