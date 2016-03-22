'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Challenges
 * @description
 * # Challenges
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Challenges', ['$resource', '$cacheFactory', 'envService',
  function ($resource, $cacheFactory, envService) {
    var _this = this;
    var cache = $cacheFactory('edrm-challenges');
    var res = $resource(envService.read('apiUrl')+'/collections/challenges/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _challenges = {};

    this.all = function(groupId, callback){
      if( groupId in _challenges ){
        callback(_challenges[groupId], null);
      }
      res.all({group:groupId}, function(value, headers){
        if ( !(groupId in _challenges) ||
            JSON.stringify(value.challenges) !== JSON.stringify(_challenges[groupId]) ){
          _challenges[groupId] = value.challenges;
          callback.call(this, value.challenges, headers);
        }
      });
    };
    this.get = function(groupId, challengeId, callback){
      _this.all(groupId, function(challenges, headers){
        var challenge = null;
        for(var i = 0; i < challenges.length ; i++){
          if(challenges[i].id === challengeId){
            challenge = challenges[i];
            break;
          }
        }
        if(challenge === null){ throw 'No challenge could be matched.'; }
        callback(challenge, headers);
      });
    };
  }]);
