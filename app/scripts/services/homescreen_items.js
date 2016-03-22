'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.HomescreenItems
 * @description
 * # HomescreenItems
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('HomescreenItems', ['$resource', '$cacheFactory', 'envService',
  function ($resource, $cacheFactory, envService) {
    var _this = this;
    var cache = $cacheFactory('edrm-homescreen-items');
    var res = $resource(envService.read('apiUrl')+'/collections/all/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _items = {};

    this.all = function(groupId, callback){
      if( groupId in _items ){
        callback(_items[groupId], null);
      }
      res.all({group:groupId}, function(value, headers){
        if ( !(groupId in _items) ||
            JSON.stringify(value.items) !== JSON.stringify(_items[groupId]) ){
          _items[groupId] = value.items;
          callback.call(this, value.items, headers);
        }
      });
    };
    this.get = function(groupId, type, itemId, callback){
      _this.all(groupId, function(items, headers){
        var item = null;
        for(var i = 0; i < items[type].length ; i++){
          if(items[type][i].id === itemId){
            item = items[type][i];
            break;
          }
        }
        if(item === null){ throw 'No item could be matched.'; }
        callback(item, headers);
      });
    };
  }]);
