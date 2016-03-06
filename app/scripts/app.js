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
    'ngMessages',
    'ngMaterial',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'environment',
    'http-auth-interceptor',
  ])
  .constant('VERSION', 'Private Beta 0.7.10')
  .config(function (envServiceProvider) {
    envServiceProvider.config({
      domains: {
        development: ['localhost'],
        staging: ['staging.codecult.nl'],
        production: ['platform.codecult.nl']
      },
      vars: {
        development: {
          apiUrl: '//localhost:8000/api',
          accountsUrl: '//localhost:8000/accounts',
          launchUrl: '//localhost:8000/launch',
          launchUrlAppRegex: /https?:\/\/localhost:8000\/launch\/[0-9]+\/apps\/[0-9]+\//,
          launchUrlUnitRegex: /https?:\/\/localhost:8000\/launch\/[0-9]+\/units\/[0-9]+\//
        },
        staging: {
          apiUrl: '//api.staging.codecult.nl',
          accountsUrl: '//accounts.staging.codecult.nl',
          launchUrl: '//launch.staging.codecult.nl',
          launchUrlAppRegex: /https?:\/\/launch.staging.codecult.nl\/[0-9]+\/apps\/[0-9]+\//,
          launchUrlUnitRegex: /https?:\/\/launch.staging.codecult.nl\/[0-9]+\/units\/[0-9]+\//
        },
        production: {
          apiUrl: '//api.codecult.nl',
          accountsUrl: '//accounts.codecult.nl',
          launchUrl: '//launch.codecult.nl',
          launchUrlAppRegex: /https?:\/\/launch.codecult.nl\/[0-9]+\/apps\/[0-9]+\//,
          launchUrlUnitRegex: /https?:\/\/launch.codecult.nl\/[0-9]+\/units\/[0-9]+\//
        }
      }
    });

    envServiceProvider.check();
  })
  .config(function ($routeProvider, $sceDelegateProvider, envServiceProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      envServiceProvider.read('launchUrlAppRegex'),
      envServiceProvider.read('launchUrlUnitRegex'),
      /https?:\/\/accounts.codecult.nl\//,
      /https?:\/\/[[a-z.-_]+.app.codecult.nl\//,
    ]);
    $routeProvider
      .when('/', {
        templateUrl: 'views/group_selector.html'
      })
      .when('/teacher-dashboard/', {
        templateUrl: 'views/teacher-dashboard.html'
      })
      .when('/apps/', {
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
      .when('/:group/', {
        templateUrl: 'views/homescreen.html'
      })
      .when('/:group/units/:unit/', {
        templateUrl: 'views/app.html',
        controller: 'UnitCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', 'envService', function($rootScope, envService){
    $rootScope.$on('event:auth-loginRequired', function(){
      var currentUrl = encodeURIComponent(window.location.href);
      window.location.href = envService.read('accountsUrl')+'/login/?next='+currentUrl;
    });
  }]);
