'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.controller:HomeController
 * @description
 * # HomeController
 * Controller of the simpleSurveyUi
 */
angular.module('simpleSurveyUi')
	.controller('HomeController', function ($scope, Page) {
		Page.setTitle('Simple Survey | Welcome');
		Page.setLH(false);
	});