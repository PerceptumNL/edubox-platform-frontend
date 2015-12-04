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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/apps.html',
        controller: 'AppsCtrl',
      })
      .when('/app/:id/', {
        templateUrl: 'views/app.html',
        controller: 'AppsCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
