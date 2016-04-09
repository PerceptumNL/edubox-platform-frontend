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
      '$rootScope', '$scope', '$location', '$mdDialog', '$mdMedia', '$http',
      'User', 'envService', 'VERSION_LABEL', 'Groups', 'Releases',
    function ($rootScope, $scope, $location,  $mdDialog, $mdMedia, $http,
              User, envService, VERSION_LABEL, Groups, Releases) {
      var isTeacher = false;
      $scope.userInfoName = null;
      $scope.showDashboardBtn = false;

      if(envService.get() === 'production'){
        $scope.version = VERSION_LABEL;
      }else{
        $scope.version = envService.get();
      }
      Releases.last(function(release){
        $scope.version += ' '+release.major+'.'+release.minor+'.'+release.patch;
      });
      $scope.launchReleases = function(){
        $location.path('/releases/');
      };

      User.info(function(info){
        $scope.userInfoName = info.name;
        isTeacher = info.isTeacher;
      });
      $scope.launchMail = function(){
        $location.path('/inbox/');
      };
      $scope.launchHelp = function(ev){
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $http({
            method: 'GET',
            url: envService.read('apiUrl')+'/csrf/'
          }).then(function(){
            $mdDialog.show({
              controller: function ($scope, $mdDialog, $http) {
                $scope.hide = function() {
                  $mdDialog.hide();
                };
                $scope.cancel = function() {
                  $mdDialog.cancel();
                };
                $scope.submit = function() {
                  var question = document.getElementById('help_dialog').question.value;
                  $http({
                    method: 'POST',
                    url: envService.read('apiUrl')+'/questions/',
                    data: {
                      'location': $location.url(),
                      'question': question
                    },
                    withCredentials: true
                  }).then(
                    function(){
                      $mdDialog.hide();
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.body))
                          .clickOutsideToClose(true)
                          .title('Verstuurd')
                          .textContent('We zullen je vraag zo snel mogelijk beantwoorden. Het antwoord kan je dan vinden onder "Berichten"')
                          .ariaLabel('We zullen je vraag zo snel mogelijk beantwoorden. Het antwoord kan je dan vinden onder "Berichten"')
                          .ok('Ok')
                          .targetEvent(ev)
                      );
                    },
                    function(){
                      $mdDialog.hide();
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.body))
                          .clickOutsideToClose(true)
                          .title('Foutje')
                          .textContent('Er is iets fout gegaan bij het versturen van je vraag')
                          .ariaLabel('Er is iets fout gegaan bij het versturen van je vraag')
                          .ok('Ok')
                          .targetEvent(ev)
                      );
                    }
                  );
                };
              },
              templateUrl: 'views/ask_help.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: useFullScreen
            });
          });
      };
      $scope.logout = function(){
        var currentUrl = encodeURIComponent(window.location.href);
        window.location = envService.read('accountsUrl')+'/logout/?next='+currentUrl;
      };
      $scope.changePassword = function(){
        var currentUrl = encodeURIComponent(window.location.href);
        window.location = envService.read('accountsUrl')+'/password/change/?next='+currentUrl;
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
