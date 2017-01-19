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
	'$route',
	'SurveyService',
	'Page',
function ($scope, $route, SurveyService, Page) {
	Page.setTitle('Simple Survey | Survey');
	Page.setLH(true);

	$scope.question = {};
	$scope.listOfAnswers = {};

	/* Get random question as soon as page loads */
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


	$scope.userResponse = function() {
		$scope.loading = true;

		if($scope.selectedAnswerPos > -1) {
			var selectedAnswer = $scope.listOfAnswers[$scope.selectedAnswerPos];

			SurveyService.createUserResponse(selectedAnswer, function (result) {
				if(result.success === true) {
					$route.reload();
				} else {
					$scope.error = 'There was an error sending your response. Try again later.';
					$scope.loading = false;
				}
			});
		} else {
			$scope.error = 'Please select an answer.';
		}

	};
}]);
