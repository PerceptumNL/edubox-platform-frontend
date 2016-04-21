'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Releases
 * @description
 * # Releases
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Releases', ['$resource', '$cacheFactory', 'envService',
  function ($resource, $cacheFactory, envService) {
    var cache = $cacheFactory('edrm-releases');
    var res = $resource(envService.read('apiUrl')+'/releases/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _releases = null;
    var _current = null;

    var callbacks = {'all': [], 'current': []};

    this.all = function(callback){
      callbacks.all.push(callback);
      if( _releases ){
        setTimeout(function(){
          while((callback = callbacks.all.shift())){
            callback(_releases, null);
          }
        }, 0);
      }
      var equal = function(a, b){
        return JSON.stringify(a) === JSON.stringify(b);
      };
      res.all(function(value, headers){
        if ( ! _releases ||
             ! equal(value.releases, _releases)){
          _releases = value.releases;
          while((callback = callbacks.all.shift())){
            callback.call(this, value.releases, headers);
          }
        }
      });
    };

    this.current = function(callback){
      callbacks.current.push(callback);
      if( _current ){
        setTimeout(function(){
          while((callback = callbacks.current.shift())){
            callback(_current, null);
          }
        }, 0);
      }
      var equal = function(a, b){
        return JSON.stringify(a) === JSON.stringify(b);
      };
      var filters = {'delivered': '1'};
      res.all(filters, function(value, headers){
        if ( ! _current ||
             ! equal(value.releases[0], _current)){
          _current = value.releases[0];
          while((callback = callbacks.current.shift())){
            callback.call(this, value.releases[0], headers);
          }
        }
      });
    };
  }]);
