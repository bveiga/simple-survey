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
		'ngStorage'
	]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/',{
			templateUrl: '../views/home.html',
			controller: 'HomeController',
			controllerAs: 'home'
		})
		.when('/survey',{
			templateUrl: '../views/survey.html',
			controller: 'SurveyController',
			controllerAs: 'survey'
		})
		.when('/admin',{
			templateUrl: '../views/admin.html',
			controller: 'AdminController',
			controllerAs: 'admin'
		})
		.otherwise({
			redirectTo:'/'
		});

	$locationProvider.html5Mode(true);

	/* Setting up httpProvider */
	$httpProvider.defaults.useXDomain = true;

	/* Adding token to every http request */
	$httpProvider.interceptors.push([
		'$q', 
		'$location', 
		'$localStorage',
		function ($q, $location, $localStorage) {
			return {
				'request': function (req) {
					var reqPath = $location.path();
					if(reqPath.indexOf('/api') > -1) {
						req.headers = req.headers || {};
						if ($localStorage.surveyUser.token) {
							req.headers.Authorization = 'Bearer ' + $localStorage.surveyUser.token;
						}
					}
					return req;
				}
			};
		}
	]);

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
app.controller('MainController', ['$scope','Page', function($scope, Page) {
	$scope.Page = Page;
}]);
