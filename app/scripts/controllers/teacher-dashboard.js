'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:TeacherDashboardCtrl
 * @description
 * # TeacherDashboardCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('TeacherDashboardCtrl', ['$scope', 'Skills', '$routeParams',
      function ($scope, Skills, $routeParams) {
        $scope.students = [];
        $scope.skills = [];
        Skills.getGroupSkills($routeParams.group, function(groupSkills){
          if( groupSkills.length > 0){
            $scope.skills = groupSkills[0].skills;
            $scope.students = groupSkills;
          }
        });
      }
  ]);
