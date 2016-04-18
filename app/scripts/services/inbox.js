'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Inbox
 * @description
 * # Inbox
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Inbox', ['$resource', '$cacheFactory', 'envService',
  function ($resource, $cacheFactory, envService) {
    var _this = this;
    var cache = $cacheFactory('edrm-inbox');
    var res = $resource(envService.read('apiUrl')+'/inbox/', null,
        {'all': { method:'GET', withCredentials: true, cache: cache }});
    var _messages = null;

    var callbacks = {'all': [], 'get': [], 'getUnreadCount': []};

    this.all = function(callback){
      callbacks.all.push(callback);
      if( _messages ){
        setTimeout(function(){
          while((callback = callbacks.all.shift())){
            callback(_messages, null);
          }
        }, 0);
      }
      res.all(function(value, headers){
        if ( ! _messages ||
            JSON.stringify(value.messages) !== JSON.stringify(_messages) ){
          _messages = value.messages;
          while((callback = callbacks.all.shift())){
            callback.call(this, value.messages, headers);
          }
        }
      });
    };
    this.get = function(messageId, callback){
      callbacks.get.push(callback);
      _this.all(function(messages, headers){
        var message = null;
        for(var i = 0; i < messages.length ; i++){
          if(messages[i].id === messageId){
            message = messages[i];
            break;
          }
        }
        if(message === null){ throw 'No message could be matched.'; }
        while((callback = callbacks.get.shift())){
          callback(message, headers);
        }
      });
    };

    this.getUnreadCount = function(callback){
      callbacks.getUnreadCount.push(callback);
      _this.all(function(messages, headers){
        while((callback = callbacks.getUnreadCount.shift())){
          callback(messages.length, headers);
        }
      });
    };
  }]);
