'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:HomescreenCtrl
 * @description Dealing with displaying the homepage for students
 * # HomescreenCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('HomescreenCtrl', ['$scope', '$routeParams', '$mdDialog', '$mdMedia', 'Units', '$location',
        function ($scope, $routeParams, $mdDialog, $mdMedia, Units, $location) {
            $scope.items = [];
            var groupId = parseInt($routeParams.group);
            var loginUrls = {};
            Units.all(groupId, function(units){
              $scope.items = [];
              for(var i = 0; i < units.length; i++){
                  $scope.items.push({
                      'id': units[i].id,
                      'group': groupId,
                      'title': units[i].label,
                      'description':'',
                      'type': 'lesson'
                  });
                  loginUrls[units[i].login] = null;
              }
              // Automatically login user into received units
              for(var loginUrl in loginUrls){
                setTimeout(Units.login(loginUrl));
              }
            });
            $scope.getTypeLabel = function(item){
              return {
                'lesson': 'Les',
                'message': 'Bericht',
                'challenge': 'Project'
              }[item.type];
            };
            $scope.getItemClass = function(item){
              return item.type+'-item';
            };
            $scope.getItemIcon = function(item){
              return 'images/'+item.type+'.svg';
            };
            $scope.onItemClick = function(item, ev) {
              if(item.type === 'challenge'){
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                $mdDialog.show({
                  controller: function ($scope, $mdDialog) {
                    $scope.title = item.title;
                    $scope.hide = function() {
                      $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                    $scope.answer = function(answer) {
                      $mdDialog.hide(answer);
                    };
                  },
                  templateUrl: 'views/project_description.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: useFullScreen
                })
                .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
                $scope.$watch(function() {
                  return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                  $scope.customFullscreen = (wantsFullScreen === true);
                });
              }else if(item.type === 'lesson'){
                $location.path('/'+groupId+'/units/'+item.id+'/');
              }
            };
        }
  ]);
