'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.controller:AdminController
 * @description
 * # AdminController
 * Controller of the simpleSurveyUi
 */
angular
.module('simpleSurveyUi')
.controller('AdminController', [
	'$scope',
	'$location',
	'$route',
	'AdminService',
	'Page',
function ($scope, $location, $route, AdminService, Page) {
	Page.setTitle('Simple Survey | Admin Dashboard');
	Page.setLH(true);

	$scope.listOfQuestions = [];

	AdminService.getQuestionResponses(function(result) {
		$scope.listOfQuestions = result;
	});

	$scope.createQuestion = function() {
		$scope.loading = true;
		AdminService.createQuestion($scope.question, function(result) {
			if(!result.success) {
				$scope.error = result.message;
				$scope.loading = false;
			} else {
	    		$route.reload();
			}
		});
    };

}]);