'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:UnitCtrl
 * @description Dealing with launching an individual learning unit
 * # UnitCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('UnitCtrl', ['$scope', '$routeParams', 'Units', 'Events', 'envService',
      function ($scope, $routeParams, Units, Events, envService) {
        var adaptor = new window.GenericAppAdaptor(envService.read('routerDomain'));
        adaptor.storeEvent = Events.store;

        Units.get(
          parseInt($routeParams.group),
          parseInt($routeParams.unit),
          function(unit){
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
