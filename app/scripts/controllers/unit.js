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

        $scope.launchUnit = function(unit){
          AppAdaptor.setToken(unit.token);
          window.EDRMBrowser.open(unit.launch);
        };

        $scope.launchActivity = function(activity){
          AppAdaptor.setToken(activity.token);
          window.EDRMBrowser.open(activity.launch);
        }

        $scope.unit = null;
        Units.get(
          parseInt($routeParams.group),
          parseInt($routeParams.unit),
          function(unit, headers){
            if( !headers ){
              $scope.$apply(function(){
                $scope.unit = unit;
              });
            } else {
              $scope.unit = unit;
            }
          }
        );
      }
  ]);

