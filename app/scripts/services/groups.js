'use strict';

/**
 * @ngdoc service
 * @name eduraamApp.Groups
 * @description
 * # Groups
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('Groups', ['$resource', 'envService',
    function ($resource, envService) {
      var _this = this;
      var res = $resource(
        envService.read('apiUrl')+'/groups/',
        null,
        {'all': { method:'GET', withCredentials: true }});

      var _groups = {};
      this.all = function(callback, role){
        var params = ( role ? { role: role } : {} );
        role = ( role ? role : '*' );
        if( _groups[role] ){ callback(_groups[role], null); }
        res.all(params, function(value, headers){
          if (JSON.stringify(value.groups) !== JSON.stringify(_groups)){
            _groups[role] = value.groups;
            callback.call(this, _groups[role], headers);
          }
        });
      };

      this.get = function(groupId, callback){
        _this.all(function(groups, headers){
          var group = null;
          for(var i = 0; i < groups.length ; i++){
            if(groups[i].id === groupId){
              group = groups[i];
              break;
            }
          }
          if(group === null){
            throw 'No group could be matched to '+groupId;
          }
          callback(group, headers);
        });
      };
    }
  ]);
