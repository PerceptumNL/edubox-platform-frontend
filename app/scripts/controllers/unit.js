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
        $scope.appLaunchUrl = Units.getLaunchUrl(
          $routeParams.group, $routeParams.unit);
        window.activateAppAdaptor = function(appWindow){
          window.GenericAppAdaptor.init(appWindow);
        };
      }
  ]);
