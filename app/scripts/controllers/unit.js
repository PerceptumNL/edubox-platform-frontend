'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:UnitCtrl
 * @description Dealing with launching an individual learning unit
 * # UnitCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('UnitCtrl', ['$scope', '$routeParams', 'Units',
      function ($scope, $routeParams, Units) {
        var adaptor = new window.GenericAppAdaptor('codecult.nl');
        Units.get(
          parseInt($routeParams.group),
          parseInt($routeParams.unit),
          function(unit){
            console.log('Setting', unit.token);
            adaptor.setToken(unit.token);
          }
        );
        $scope.appLaunchUrl = Units.getLaunchUrl(
          $routeParams.group, $routeParams.unit);
        window.activateAppAdaptor = function(appWindow){
          adaptor = adaptor.init(appWindow);
        };
      }
  ]);
