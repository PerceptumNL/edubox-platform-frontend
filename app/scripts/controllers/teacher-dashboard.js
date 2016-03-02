'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:TeacherDashboardCtrl
 * @description
 * # TeacherDashboardCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('TeacherDashboardCtrl', ['$scope',
      function ($scope) {
        $scope.students = [
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Beau van der Walle"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Fay Middelbos"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Adam Jelten"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Yessie Rademakers"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Sven Roevros"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Bo Degger"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Esmeralda de Kruijff"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Giso van Zelm van Eldik"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Danilo Meskers"},
          {"mastery": {"1": 3, "2": 1, "3": 1, "4": 1, "5": 1}, "name": "Quinty van Munsteren"},
        ];
        $scope.concepts = [
          { 'id': 1, 'name': 'Sequentie' },
          { 'id': 2, 'name': 'Herhalen' },
          { 'id': 3, 'name': 'Als dan' },
          { 'id': 4, 'name': 'Variabelen' },
          { 'id': 5, 'name': 'Functies' }
        ];
      }
  ]);
