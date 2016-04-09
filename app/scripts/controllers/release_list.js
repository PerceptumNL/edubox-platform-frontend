'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:ReleaseListCtrl
 * @description
 * # ReleaseListCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('ReleaseListCtrl', ['$scope', 'Releases',
      function ($scope, Releases) {
        $scope.releases = null;
        Releases.all(function(releases){
          $scope.releases = releases;
        });
      }
  ]);
