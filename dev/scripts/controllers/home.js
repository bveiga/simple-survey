'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.controller:HomeController
 * @description
 * # HomeController
 * Controller of the simpleSurveyUi
 */
angular.module('simpleSurveyUi')
	.controller('HomeController',['$scope', 'Page', function ($scope, Page) {
		Page.setTitle('Simple Survey | Welcome');
		Page.setLH(false);
	}]);