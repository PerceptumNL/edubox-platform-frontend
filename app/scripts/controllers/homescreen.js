'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:HomescreenCtrl
 * @description Dealing with displaying the homepage for students
 * # HomescreenCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('HomescreenCtrl', [
      '$scope', '$routeParams', '$mdDialog', '$mdMedia',
      'Units', 'HomescreenItems', '$location',
        function ($scope, $routeParams, $mdDialog, $mdMedia,
          Units, HomescreenItems, $location) {
            $scope.items = [];
            var groupId = parseInt($routeParams.group);
            var loginUrls = {};
            HomescreenItems.all(groupId, function(items){
              // TODO what are we going to do when challenges are also loading?
              $scope.items = [];
              for(var i = 0; i < items.units.length; i++){
                  $scope.items.push({
                      'id': items.units[i].id,
                      'group': groupId,
                      'title': items.units[i].label,
                      'description':'',
                      'type': 'lesson'
                  });
                  loginUrls[items.units[i].login] = null;
              }
              for(var j = 0; j < items.challenges.length; j++){
                  $scope.items.push({
                      'id': items.challenges[j].id,
                      'group': groupId,
                      'title': items.challenges[j].label,
                      'description':'',
                      'body': items.challenges[j].body,
                      'type': 'challenge'
                  });
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
                    $scope.description = item.body;
                    $scope.hide = function() {
                      $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                      $mdDialog.cancel();
                    };
                    $scope.start = function() {
                      $mdDialog.hide();
                    };
                  },
                  templateUrl: 'views/project_description.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: useFullScreen
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
