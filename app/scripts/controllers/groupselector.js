'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:GroupSelectorCtrl
 * @description
 * # GroupSelectorCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('GroupSelectorCtrl', ['$scope', '$location', 'Groups',
    function ($scope, $location, Groups) {
      $scope.groups = [];
      $scope.onGroupSelect = function(group){
        $location.path('/'+group.id+'/');
      };
      Groups.all(function(groups){
        if(groups.length === 1){
          // If there is only one group, select it.
          $scope.onGroupSelect(groups[0]);
        }
        $scope.groups = groups;
      });
    }
  ]);
