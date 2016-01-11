'use strict';

/**
 * @ngdoc overview
 * @name eduraamApp
 * @description
 * # eduraamApp
 *
 * Main module of the application.
 */
angular
  .module('eduraamApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngMaterial',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'environment',
  ])
  .config(function (envServiceProvider) {
	  envServiceProvider.config({
		  domains: {
			  development: ['localhost'],
			  production: ['platform.eduraam.nl', 'staging.eduraam.nl']
		  },
		  vars: {
			  development: {
				  apiUrl: '//localhost:8000/api',
				  launchUrl: '//localhost:8000/launch',
				  launchUrlRegex: /https?:\/\/localhost:8000\/launch\/[0-9]+\/[0-9]+\//
			  },
			  production: {
				  apiUrl: '//api.eduraam.nl',
				  launchUrl: '//launch.eduraam.nl',
				  launchUrlRegex: /https?:\/\/launch.eduraam.nl\/[0-9]+\/[0-9]+\//
			  }
		  }
	  });

	  envServiceProvider.check();
  })
  .config(function ($routeProvider, $sceDelegateProvider, envServiceProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
	  envServiceProvider.read('launchUrlRegex'),
      /https?:\/\/accounts.eduraam.nl\//,
      /https?:\/\/[[a-z.-_]+.app.eduraam.nl\//,
    ]);
    $routeProvider
      .when('/', {
        templateUrl: 'views/app_list.html',
        controller: 'AppListCtrl',
      })
      .when('/apps/:group/:app/', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
