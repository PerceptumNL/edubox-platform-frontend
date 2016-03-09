'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Skills
 * @description
 * # Skills
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Skills', ['$resource', 'envService',
    function ($resource, envService) {
      var res = $resource(
        envService.read('apiUrl')+'/skills/',
        null,
        {'all': { method:'GET', withCredentials: true }});

      this.getMySkills = function(callback){
        res.all(function(value, headers){
          callback.call(this, value.skills, headers);
        });
      };
      this.getGroupSkills = function(groupId, callback){
        res.all({group:groupId}, function(value, headers){
          callback.call(this, value.skills, headers);
        });
      };
    }
  ]);
