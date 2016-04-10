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

    this.all = function(callback, deliveredOnly){
      var filters = (deliveredOnly ? {'delivered': '1'} : {});
      if( _releases ){
        callback(_releases, null);
      }
      res.all(filters, function(value, headers){
        if ( ! _releases ||
            JSON.stringify(value.releases) !== JSON.stringify(_releases) ){
          _releases = value.releases;
          callback.call(this, value.releases, headers);
        }
      });
    };

    this.mostRecent = function(callback){
      _this.all(function(releases, headers){
        callback(releases[0], headers);
      });
    };
  }]);
