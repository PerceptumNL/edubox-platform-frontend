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
        Releases.all(function(releases, headers){
          if( !headers ){
            $scope.$apply(function(){
              $scope.releases = releases;
            });
          } else {
            $scope.releases = releases;
          }
        });
      }
  ]);
