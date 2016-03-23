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
        Units.get(
          parseInt($routeParams.group),
          parseInt($routeParams.unit),
          function(unit){
            AppAdaptor.setToken(unit.token);
          }
        );
        window.EDRMBrowser.open(Units.getLaunchUrl(
          $routeParams.group, $routeParams.unit));
      }
  ]);
