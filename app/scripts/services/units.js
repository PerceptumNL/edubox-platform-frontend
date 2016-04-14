'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Units
 * @description
 * # Units
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Units', ['$resource', '$cacheFactory', 'envService', '$http',
  function ($resource, $cacheFactory, envService, $http) {
    var _this = this;
    var cache = $cacheFactory('edrm-units');
    var res = $resource(envService.read('apiUrl')+'/collections/units/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _units = {};

    this.all = function(groupId, callback){
      if( groupId in _units ){
        setTimeout(function(){
          callback(_units[groupId], null);
        }, 0);
      }
      res.all({group:groupId}, function(value, headers){
        if ( !(groupId in _units) ||
            JSON.stringify(value.units) !== JSON.stringify(_units[groupId]) ){
          _units[groupId] = value.units;
          callback.call(this, value.units, headers);
        }
      });
    };
    this.get = function(groupId, unitId, callback){
      _this.all(groupId, function(units, headers){
        var unit = null;
        for(var i = 0; i < units.length ; i++){
          if(units[i].id === unitId){
            unit = units[i];
            break;
          }
        }
        if(unit === null){ throw 'No unit could be matched.'; }
        callback(unit, headers);
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
