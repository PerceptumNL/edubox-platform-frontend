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
    var _this = this;
    var cache = $cacheFactory('edrm-units');
    var res = $resource(envService.read('apiUrl')+'/collections/learning-units/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _units = null;

    this.all = function(callback){
      if( _units !== null ){ callback(_units, null); }
      res.all(function(value, headers){
        if (JSON.stringify(value.units) !== JSON.stringify(_units)){
          _units = value.units;
          callback.call(this, _units, headers);
        }
      });
    };
    this.get = function(groupId, unitId, callback){
      _this.all(function(unitGroups, headers){
        console.log(unitGroups);
        var group = null;
        for(var i = 0; i < unitGroups.length ; i++){
          if(unitGroups[i].id === groupId){
            group = unitGroups[i];
            break;
          }
        }
        if(group === null){
          throw 'No group could be matched to '+groupId;
        }
        var unit = null;
        for(var j = 0; j < group.units.length ; j++){
          if(group.units[j].id === unitId){
            unit = group.units[j];
            break;
          }
        }
        if(unit === null){ throw 'No unit could be matched.'; }
        callback(unit, headers);
      });
    };
    this.getLaunchUrl = function(group, unit){
      return envService.read('launchUrl')+'/'+group+'/units/'+unit+'/';
    };
    this.login = function(loginUrl){
      $http({
        method: 'GET',
        withCredentials: true,
        url: envService.read('accountsUrl')+loginUrl
      });
    };
  }]);
