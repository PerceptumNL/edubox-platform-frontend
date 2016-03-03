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
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Beau van der Walle'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Fay Middelbos'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Adam Jelten'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Yessie Rademakers'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Sven Roevros'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Bo Degger'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Esmeralda de Kruijff'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Giso van Zelm van Eldik'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Danilo Meskers'},
          {'mastery': {'1': 3, '2': 1, '3': 1, '4': 1, '5': 1, '6': 0, '7': 1, '8': 0, '9': 0}, 'name': 'Quinty van Munsteren'},
        ];
        $scope.concepts = [
          { 'id': 1, 'name': 'Rij' },
          { 'id': 2, 'name': 'Als' },
          { 'id': 3, 'name': 'Als-anders' },
          { 'id': 4, 'name': 'Herhaal aantal keer' },
          { 'id': 5, 'name': 'Herhaal totdat' },
          { 'id': 6, 'name': 'Zolang' },
          { 'id': 7, 'name': 'Teller' },
          { 'id': 8, 'name': 'Functies' },
          { 'id': 9, 'name': 'Functies met parameters' },
        ];
      }
  ]);
