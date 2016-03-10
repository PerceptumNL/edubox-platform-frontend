'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('ToolbarCtrl', ['$scope', '$mdSidenav', 'User', 'envService', 'VERSION',
    function ($scope, $mdSidenav, User, envService, VERSION) {
      $scope.userInfoName = null;
      if(envService.get() === 'production'){
        $scope.version = VERSION;
      }else{
        $scope.version = envService.get();
      }
      User.info(function(info){
        $scope.userInfoName = info.name;
      });
      $scope.launchHelp = function(){
          $mdSidenav('help-sidenav').open();
      };
      $scope.logout = function(){
        var currentUrl = encodeURIComponent(window.location.href);
        window.location = envService.read('accountsUrl')+'/logout/?next='+currentUrl;
      };
    }
  ])
  .controller('HelpCtrl', ['$scope', '$mdDialog', '$mdSidenav',
    function ($scope, $mdDialog, $mdSidenav){
        $scope.resources = [
            {'type':'video', 'title': 'Wat is een les?'},
            {'type':'video', 'title': 'Wat is een project? '},
            {'type':'video', 'title': 'Wat moet ik doen? '}
        ];
        $scope.getResourceIcon = function(resource){
            return 'images/'+resource.type+'.svg';
        };
        $scope.loadResource = function(resource, ev){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title('Help')
                .textContent(resource.title)
                .ariaLabel(resource.title)
                .ok('Got it!')
                .targetEvent(ev)
            );
        };
        $scope.hide = function(){
            $mdSidenav('help-sidenav').close();
        };
    }
  ]);
