'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:UnitCtrl
 * @description Dealing with launching an individual learning unit
 * # UnitCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('UnitCtrl', [
      '$scope', '$routeParams', 'Units', 'Events', 'AppAdaptor',
      function ($scope, $routeParams, Units, Events, AppAdaptor) {
        AppAdaptor.storeEvent = Events.store;
        window.activateAppAdaptor = function(appWindow){
          AppAdaptor = AppAdaptor.init(appWindow);
        };

        Units.get(
          parseInt($routeParams.group),
          parseInt($routeParams.unit),
          function(unit){
            AppAdaptor.setToken(unit.token);
          }
        );
        $scope.appLaunchUrl = Units.getLaunchUrl(
          $routeParams.group, $routeParams.unit);
      }
  ]);
