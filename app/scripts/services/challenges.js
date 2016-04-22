'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Challenges
 * @description
 * # Apps
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Challenges', ['$resource', '$cacheFactory', 'envService', '$http',
  function ($resource, $cacheFactory, envService, $http) {
    var cache = $cacheFactory('edrm-challenges');
    var res = $resource(envService.read('apiUrl')+'/collections/challenges/:challengeId', null,
        {'query': { method:'GET', withCredentials: true, cache: cache }});
    var _challenges = {};

    this.all = function(groupId, callback){
      if( groupId in _challenges ){
        setTimeout(function(){
          callback(_challenges[groupId], null);
        }, 0);
      }
      res.query({group:groupId}, function(value, headers){
        if ( !(groupId in _challenges) ||
            JSON.stringify(value.challenges) !== JSON.stringify(_challenges[groupId]) ){
          _challenges[groupId] = value.challenges;
          callback.call(this, value.challenges, headers);
        }
      });
    };
    this.get = function(groupId, challengeId, callback){
      res.query({challengeId:challengeId, group:groupId}, function(value, headers){
        callback(value, headers);
      });
    };

    this.login = function(loginUrl){
      $http({
        method: 'GET',
        withCredentials: true,
        url: loginUrl
      });
    };
  }]);
