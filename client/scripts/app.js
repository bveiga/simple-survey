'use strict';

/**
 * @ngdoc overview
 * @name simpleSurveyUi
 * @description
 * # simpleSurveyUi
 *
 * Main module of the application.
 */

var app = angular
	.module('simpleSurveyUi', [
		'ngResource',
		'ngRoute',
		'ngSanitize'
	]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'HomeController',
			controllerAs: 'home'
		})
		.otherwise({
			redirectTo:'/'
		});

	$locationProvider.html5Mode(true);

	/* Setting up httpProvider */
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
}]);

/*==================================================================================
=            Service that handles shared data between pages/controllers            =
==================================================================================*/
app.factory('Page', function(){
	var title = 'Simple Survey';
	var loadHeader = false;

	return {
		title: function() { return title; },
		setTitle: function(newTitle) { title = newTitle; },
		getLH: function() { return loadHeader; },
		setLH: function(value) { loadHeader = value; },
	};
});

/*===================================================
=            Main Controller for the app            =
===================================================*/
app.controller('MainController', function($scope, Page) {
	$scope.Page = Page;
});
