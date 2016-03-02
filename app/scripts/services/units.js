'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Units
 * @description
 * # Apps
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .factory('Units', ['$resource', 'envService', '$http',
  function ($resource, envService, $http) {
    var res = $resource(envService.read('apiUrl')+'/collections/learning-units/', null,
        {'all': { method:'GET', withCredentials: true }});
    res.getLaunchUrl = function(group, unit){
      return envService.read('launchUrl')+'/'+group+'/units/'+unit+'/';
    };
	res.login = function(loginUrl){
		$http({
			method: 'GET',
			withCredentials: true,
			url: envService.read('accountsUrl')+loginUrl
		}).then(function(){
			console.log('Logged in:', loginUrl);
		});
	};
    return res;
  }]);
