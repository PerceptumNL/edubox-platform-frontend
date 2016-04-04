'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('ToolbarCtrl', [
      '$rootScope', '$scope', '$location', '$mdSidenav', '$mdDialog',
      'User', 'envService', 'VERSION', 'Groups',
    function ($rootScope, $scope, $location,  $mdSidenav, User, envService, VERSION, Groups) {
      var isTeacher = false;
      $scope.userInfoName = null;
      $scope.showDashboardBtn = false;

      if(envService.get() === 'production'){
        $scope.version = VERSION;
      }else{
        $scope.version = envService.get();
      }
      User.info(function(info){
        $scope.userInfoName = info.name;
        isTeacher = info.isTeacher;
      });
      $scope.launchHelp = function(){
          $mdSidenav('help-sidenav').open();
      };
      $scope.logout = function(){
        var currentUrl = encodeURIComponent(window.location.href);
        window.location = envService.read('accountsUrl')+'/logout/?next='+currentUrl;
      };
      $scope.changePassword = function(){
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              $scope.title = item.title;
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.submit = function(form) {
                console.log(form);
                $mdDialog.hide();
              };
            },
            templateUrl: 'views/change_password.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })
      };
      $scope.teachingGroups = [];
      Groups.all(function(groups){
        if ( groups.length > 0 ){
          $scope.teachingGroups = groups;
          $scope.showDashboardBtn = true;
        } else {
          $scope.teachingGroups = [];
          $scope.showDashboardBtn = false;
        }
      }, 'Teacher');

      $scope.loadDashboard = function(groupId){
        $location.path('/'+groupId+'/dashboard/');
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
