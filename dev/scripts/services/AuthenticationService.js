'use strict';

/**
 * @ngdoc function
 * @name simpleSurveyUi.service:AuthenticationService
 * @description
 * # AuthenticationService\
 */
angular
.module('simpleSurveyUi')
.factory('AuthenticationService', ['$http', '$localStorage', function ($http, $localStorage) {

	function Login(email, password, callback) {
		$http.post('/api/authenticate', {
			email: email,
			password: password
		}).then(function (response) {
			var data = response.data;

			if(data.token) {
				/* Store user info in local storage */
				$localStorage.surveyUser = {
					id: data.id,
					token: data.token
				};

				/* JWT schema for content headers */
				$http.defaults.headers.common.Authorization = 
					'Bearer '+ data.token;

				callback({ success: true });
			} else {
				callback(data);
			}
		});
	}

	function Logout() {
		delete $localStorage.surveyUser;
		$http.defaults.headers.common.Authorization = '';
	}
	
	var service = {};
	service.Login = Login;
	service.Logout = Logout;

	return service;

}]);