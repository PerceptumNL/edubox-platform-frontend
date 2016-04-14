'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:TeacherDashboardCtrl
 * @description
 * # TeacherDashboardCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('TeacherDashboardCtrl', ['$scope', 'Skills', '$routeParams', 'Groups', 'User',
      function ($scope, Skills, $routeParams, Groups, User) {
        $scope.students = null;
        $scope.skills = [];
        $scope.groupTitle = null;
        Groups.get($routeParams.group, function(group){
          $scope.groupTitle = group.title;
        });
        Skills.getGroupSkills($routeParams.group, function(groupSkills){
          if( groupSkills.length > 0){
            $scope.skills = groupSkills[0].skills;
            $scope.students = groupSkills;
          }
        }, true);
        User.getGroupInfo($routeParams.group, function(studentsInfo){
          $scope.studentsInfo = studentsInfo;
        });
      }
  ]);
