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
	  return $resource(envService.read('apiUrl')+"/apps", null,
			  {'all': { method:'GET', withCredentials: true }});
  }]);
