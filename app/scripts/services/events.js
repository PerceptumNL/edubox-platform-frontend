'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Events
 * @description
 * # Events
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Events', ['envService', '$http',
      function (envService, $http) {
        this.store = function(token, verb, object, result){
          var payload;
          if(result){
            payload = {'verb': verb, 'object': object, 'result': result};
          }else{
            payload = {'verb': verb, 'object': object};
          }
          return $http({
            method: 'POST',
            data: payload,
            withCredentials: true,
            url: envService.read('apiUrl')+'/events/?app-token='+token
          });
        };
      }
  ]);
