'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Units
 * @description
 * # Apps
 * Factory in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Units', ['$resource', '$cacheFactory', 'envService', '$http',
  function ($resource, $cacheFactory, envService, $http) {
    var cache = $cacheFactory('edrm-units');
    var res = $resource(envService.read('apiUrl')+'/collections/units/:unitId', null,
        {'query': { method:'GET', withCredentials: true, cache: cache }});
    var _units = {};

    this.all = function(groupId, callback){
      if( groupId in _units ){
        setTimeout(function(){
          callback(_units[groupId], null);
        }, 0);
      }
      res.query({group:groupId}, function(value, headers){
        if ( !(groupId in _units) ||
            JSON.stringify(value.units) !== JSON.stringify(_units[groupId]) ){
          _units[groupId] = value.units;
          callback.call(this, value.units, headers);
        }
      });
    };
    this.get = function(groupId, unitId, callback){
      res.query({unitId:unitId, group:groupId}, function(value, headers){
        callback(value, headers);
      });
    };

    this.getLaunchUrl = function(groupId, unitId){
      return envService.read('launchUrl')+'/'+groupId+'/units/'+unitId+'/';
    };

    this.login = function(loginUrl){
      $http({
        method: 'GET',
        withCredentials: true,
        url: loginUrl
      });
    };
  }]);
