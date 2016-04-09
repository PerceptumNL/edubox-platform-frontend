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
    var _messages = {};

    this.all = function(callback){
      if( _messages ){
        callback(_messages, null);
      }
      res.all(function(value, headers){
        if ( ! _messages ||
            JSON.stringify(value.messages) !== JSON.stringify(_messages) ){
          _messages = value.messages;
          callback.call(this, value.messages, headers);
        }
      });
    };
    this.get = function(messageId, callback){
      _this.all(function(messages, headers){
        var message = null;
        for(var i = 0; i < messages.length ; i++){
          if(messages[i].id === messageId){
            message = messages[i];
            break;
          }
        }
        if(message === null){ throw 'No message could be matched.'; }
        callback(message, headers);
      });
    };
  }]);
