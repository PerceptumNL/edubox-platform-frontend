'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:StudentHomeCtrl
 * @description Dealing with displaying the homepage for students
 * # StudentHomeCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('StudentHomeCtrl', ['$scope', '$mdDialog', '$mdMedia', 'Units', '$location',
		function ($scope, $mdDialog, $mdMedia, Units, $location) {
			$scope.items = [];
            /*$scope.items = [
                { 'title': 'Welkom!',
                  'description': 'Hallo Sander, wat leuk dat je er bent.',
                  'type': 'message',
                },
                { 'title': 'Minecraft',
                  'description': 'Niveau 1',
                  'type': 'lesson',
                },
                { 'title': 'Frozen',
                  'description': 'Niveau 1',
                  'type': 'lesson',
                },
                { 'title': 'Star wars',
                  'description': 'Niveau 1',
                  'type': 'lesson',
                },
                { 'title': 'Achtergrond veranderen',
                  'description': 'Verander de achtergrond in een Scratch project',
                  'type': 'challenge',
                }
            ];*/
			var res = Units.all(function(){
				for(var i = 0; i < res.units.length; i++){
					$scope.items.push({
						'id': res.units[i].id,
						'title': res.units[i].label,
						'description':'',
						'type': 'lesson'
					});
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
				$location.path('/units/1/'+item.id+'/');
              }
            };
		}
  ]);
