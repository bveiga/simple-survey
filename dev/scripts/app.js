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
		.otherwise({
			redirectTo:'/'
		});

	$locationProvider.html5Mode(true);

	/* Setting up httpProvider */
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
}]);

app.run(['$rootScope', '$http', '$location', '$localStorage',
function ($rootScope, $http, $location, $localStorage) {
	if($localStorage.surveyUser) {
		console.log('local storage is set');
		$http.defaults.headers.common.Authorization = 'Bearer '+$localStorage.surveyUser.token;
	}

	/* Send user back to home page to log in */
	$rootScope.$on('$locationChangeStart', function () {
		console.log('change location');
		var homePage = '/';
		var isRestricted = $location.path() !== homePage;
		if(isRestricted && !$localStorage.surveyUser) {
			$location.path(homePage);
		}
	});
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
