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
	'AuthenticationService',
	'Page',
function ($scope, $location, AuthenticationService, Page) {
	Page.setTitle('Simple Survey | Welcome');
	Page.setLH(true);
}]);