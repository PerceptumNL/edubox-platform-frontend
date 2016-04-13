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
    var _this = this;
    var cache = $cacheFactory('edrm-releases');
    var res = $resource(envService.read('apiUrl')+'/releases/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _releases = null;
    var _filters = {};

    this.all = function(callback, deliveredOnly){
      var filters = (deliveredOnly ? {'delivered': '1'} : {});
      if( _releases ){
        setTimeout(function(){
          callback(_releases, null);
        }, 0);
      }
      var equal = function(a, b){
        return JSON.stringify(a) === JSON.stringify(b);
      };
      res.all(filters, function(value, headers){
        if ( ! _releases ||
             ! equal(value.releases, _releases) ||
             ! equal(filters, _filters) ){
          _releases = value.releases;
          _filters = filters;
          callback.call(this, value.releases, headers);
        }
      });
    };

    this.mostRecent = function(callback, deliveredOnly){
      _this.all(function(releases, headers){
        callback(releases[0], headers);
      }, deliveredOnly);
    };
  }]);
