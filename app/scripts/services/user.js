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
        getGroupInfo: function(groupId, callback){
          $http.get(
              envService.read('accountsUrl')+'/info?group='+groupId,
              { withCredentials: true }
          ).then(function(result){ callback(result.data.info); });
        }
      };
  }]);
