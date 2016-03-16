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

      this.getMySkills = function(callback, filterDashboard){
        params = ( filterDashboard ? { 'filter_dashboard': 1 } : {} );
        res.all(params, function(value, headers){
          callback.call(this, value.skills, headers);
        });
      };
      this.getGroupSkills = function(groupId, callback, filterDashboard){
        if( filterDashboard ){
          var params = { 'filter_dashboard': 1, 'group': groupId }
        } else {
          var params = { 'group': groupId }
        }
        res.all(params, function(value, headers){
          callback.call(this, value.skills, headers);
        });
      };
    }
  ]);
