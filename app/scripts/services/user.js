'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.user
 * @description
 * # user
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .factory('User', ['$http', 'envService',
  function ($http, envService) {
      return {
        info: function(callback){
          $http.get(
              envService.read('accountsUrl')+'/info',
              { withCredentials: true }
          ).then(function(result){ callback(result.data.info); });
        },
        changePassword: function(oldPwd1, oldPwd2, newPwd, callback, errorCallback){
          if( oldPwd1 !== oldPwd2 ){
            throw 'Passwords are not the same';
          }
          $http.post(
              envService.read('accountsUrl')+'/change_password',
              {'old': oldPwd1, 'new': newPwd},
              { withCredentials: true }
          ).then(callback, errorCallback);
        }
      };
  }]);
