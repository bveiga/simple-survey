'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.controller:HomeController
 * @description
 * # HomeController
 * Controller of the simpleSurveyUi
 */
angular
.module('simpleSurveyUi')
.controller('HomeController', [
	'$scope',
	'$location',
	'AuthenticationService',
	'Page',
function ($scope, $location, AuthenticationService, Page) {
	Page.setTitle('Simple Survey | Welcome');
	Page.setLH(false);

	$scope.login = function() {
		$scope.loading = true;
		AuthenticationService.Login($scope.email, $scope.password, function (result) {
			if(result.success === true) {
				console.log('SUCCESS');
				$location.path('/survey');
			} else {
				console.log('FAIL'+result.message);
				$scope.error = result.message;
				$scope.loading = false;
			}
		});
	};
}]);