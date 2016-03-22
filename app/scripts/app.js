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
    'http-auth-interceptor'
  ])
  .constant('VERSION', 'Private Beta 0.7.11')
  .config(function (envServiceProvider) {
    envServiceProvider.config({
      domains: {
        development: ['localhost'],
        staging: ['staging.codecult.nl'],
        production: ['platform.codecult.nl']
      },
      vars: {
        development: {
          xssDomain: 'codecult.local',
          routerDomain: 'codecult.local:5000',
          routerProtocol: 'http',
          apiUrl: 'http://api.codecult.local:8000',
          accountsUrl: 'http://accounts.codecult.local:8000',
          accountsUrlRegex: /http:\/\/accounts.codecult.local:8000\//,
          launchUrl: 'http://launch.codecult.local:8000',
          launchUrlAppRegex: /http:\/\/launch.codecult.local:8000\/[0-9]+\/apps\/[0-9]+\//,
          launchUrlUnitRegex: /http:\/\/launch.codecult.local:8000\/[0-9]+\/units\/[0-9]+\//
        },
        staging: {
          xssDomain: 'codecult.nl',
          routerDomain: 'staging.codecult.nl',
          routerProtocol: 'http',
          apiUrl: 'http://api.staging.codecult.nl',
          accountsUrl: 'http://accounts.staging.codecult.nl',
          accountsUrlRegex: /http:\/\/accounts.staging.codecult.nl\//,
          launchUrl: 'http://launch.staging.codecult.nl',
          launchUrlAppRegex: /http:\/\/launch.staging.codecult.nl\/[0-9]+\/apps\/[0-9]+\//,
          launchUrlUnitRegex: /http:\/\/launch.staging.codecult.nl\/[0-9]+\/units\/[0-9]+\//
        },
        production: {
          xssDomain: 'codecult.nl',
          routerDomain: 'codecult.nl',
          routerProtocol: 'https',
          apiUrl: '//api.codecult.nl',
          accountsUrl: '//accounts.codecult.nl',
          accountsUrlRegex: /https?:\/\/accounts.codecult.nl\//,
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
      envServiceProvider.read('accountsUrlRegex'),
    ]);
    $routeProvider
      .when('/', {
        templateUrl: 'views/group_selector.html'
      })
      .when('/:group/dashboard/', {
        templateUrl: 'views/teacher-dashboard.html'
      })
      .when('/apps/', {
        templateUrl: 'views/app_list.html',
        controller: 'AppListCtrl',
      })
      .when('/apps/:group/:app/', {
        controller: 'AppCtrl',
        templateUrl: 'views/loader.html'
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
        controller: 'UnitCtrl',
        templateUrl: 'views/loader.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', 'envService', function($rootScope, envService){
    window.document.domain = envService.read('xssDomain');
    $rootScope.$on('event:auth-loginRequired', function(){
      var currentUrl = encodeURIComponent(window.location.href);
      window.location.href = envService.read('accountsUrl')+'/login/?next='+currentUrl;
    });
  }]);
