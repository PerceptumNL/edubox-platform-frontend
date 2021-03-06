'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('InboxCtrl', ['$scope', '$location', 'Inbox',
    function($scope, $location, Inbox){
      $scope.messages = null;
      Inbox.all(function(messages, headers){
        if( !headers ){
          $scope.$apply(function(){
            $scope.messages = messages;
          });
        }else{
          $scope.messages = messages;
        }
      });
      $scope.loadMessage = function(message){
        $location.path('/inbox/'+message.id+'/');
      };
    }
  ]);
