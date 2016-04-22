'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:ChallengeCtrl
 * @description Dealing with launching an individual learning unit
 * # ChallengeCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('ChallengeCtrl', [
      '$scope', '$routeParams', 'Challenges', 'Events', 'AppAdaptor',
      function ($scope, $routeParams, Challenges, Events, AppAdaptor) {
        AppAdaptor.storeEvent = Events.store;
        window.activateAppAdaptor = function(appWindow){
          AppAdaptor = AppAdaptor.init(appWindow);
        };

        $scope.launchChallenge = function(challenge){
          AppAdaptor.setToken(challenge.token);
          window.EDRMBrowser.open(challenge.launch);
        };

        $scope.challenge = null;
        Challenges.get(
          parseInt($routeParams.group),
          parseInt($routeParams.challenge),
          function(challenge, headers){
            if( !headers ){
              $scope.$apply(function(){
                $scope.challenge = challenge;
              });
            } else {
              $scope.challenge = challenge;
            }
          }
        );
      }
  ]);
