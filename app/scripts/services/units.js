'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Units
 * @description
 * # Apps
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .factory('Units', ['$resource', 'envService',
  function ($resource, envService) {
    var res = $resource(envService.read('apiUrl')+'/collections/learning-units/', null,
        {'all': { method:'GET', withCredentials: true }});
    res.getLaunchUrl = function(group, unit){
      return envService.read('launchUrl')+'/'+group+'/units/'+unit+'/';
    };
    return res;
  }]);
