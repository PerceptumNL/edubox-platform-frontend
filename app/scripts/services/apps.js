'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Apps
 * @description
 * # Apps
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .factory('Apps', ['$resource', 'envService',
  function ($resource, envService) {
    var res = $resource(envService.read('apiUrl')+'/apps', null,
        {'all': { method:'GET', withCredentials: true }});
    res.getLaunchUrl = function(group, app){
      return envService.read('launchUrl')+'/'+group+'/'+app+'/';
    };
    return res;
  }]);
