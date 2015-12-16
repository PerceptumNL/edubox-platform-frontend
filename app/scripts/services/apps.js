'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Apps
 * @description
 * # Apps
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .factory('Apps', ['$resource', function ($resource) {
	  return $resource("http://localhost:8000/api/apps/", null,
			  {'all': {method:'GET', withCredentials: true }})
  }]);
