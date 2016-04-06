'use strict';
window.GenericAppAdaptor = function(envService){
  var _this = this;
  this.routerDomain = envService.read('routerDomain');
  this.routerHostname = new window.URI('http://'+this.routerDomain).hostname();
  this.routerProtocol = envService.read('routerProtocol');

  this.appUrls = {
    routedUrlObj: null,
    unroutedUrlObj: null
  };

  this.getAdaptors = function(){
    return {
      'studio.code.org/s/': (new window.CodeOrgAdaptor(envService, _this)),
      'studio.code.org/flappy/': (new window.CodeOrgAdaptor(envService, _this)),
      'scratch.mit.edu/projects/': (new window.ScratchAdaptor(envService, _this))
    };
  };

  this.unrouteUrl = function(url){
    if( url[0] === '#'){
      return url;
    } else if( url[0] === '/'){
      return url;
    } else {
      // convert url into a more manageable form.
      var urlObj = new window.URI(url);
      var hostParts = urlObj.hostname().split('.');
      if( hostParts.slice(1).join('.') === _this.routerHostname ){
        // Unhash subdomain
        var subdomain = hostParts[0];
        var unhashedDomain = '';
        for( var i = 0; i < subdomain.length; i += 2){
          unhashedDomain += String.fromCharCode(
            parseInt(subdomain.substr(i, 2), 16));
        }
        return urlObj.host(unhashedDomain).toString();
      }else{
        return url;
      }
    }
  };

  this.routeUrl = function(url, ignoreToken){
    var routing = {
      'code.org': true,
      'scratch.mit.edu': true,
      'google.com': true,
      'google-analytics': true
    };
    var token = (ignoreToken ? null : _this.getToken() );
    if( url[0] === '#'){
      return url;
    } else if( url[0] === '/' && ( url.length === 1 || url[1] !== '/' ) ){
      if(token){
        return new window.URI(url).setQuery('token', token).toString();
      }
    }else{
      // convert url into a more manageable form.
      var urlObj = new window.URI(url);
      var host = urlObj.host();
      // if host should be routed
      var routeHost = false;
      for(var suffix in routing){
        if( host.endsWith(suffix) ){
          routeHost = true;
          break;
        }
      }
      if( routeHost ){
        // Construct the routed host to send the request to.
        var routedHost = '';
        for (var i=0; i < host.length; i++) {
          routedHost += host.charCodeAt(i).toString(16);
        }
        routedHost += '.'+this.routerDomain;
        urlObj = urlObj.host(routedHost);

        // Add the token if applicable.
        if(token){
          urlObj = urlObj.setQuery('token', token);
        }
        // Ensure the router protocol
        urlObj.protocol(_this.routerProtocol);
        return urlObj.toString();
      // If host is the same as the current routed host
      }else if( host === _this.appUrls.routedUrlObj.host() ){
        // Only add the token if applicable.
        if(token){
          return urlObj.setQuery('token', token).toString();
        }
      }
    }
    // If no adaption rule applied, return the original url
    return url;
  };

  var _token = null;
  this.getToken = function(){ return _token; };
  this.setToken = function(token){ _token = token; };

  this.storeEvent = function(){}; // Get's overriden by controller

  /**
   * Initialize adaptor depending on the src location of the app window.
   * If the location matches one of the app-specific adaptors, the call is
   * delegated, else this generic adaptor will be used.
   * @param appWindow - reference to app frame's window.
   **/
  this.init = function(appWindow){
    var src = _this.unrouteUrl(appWindow.document.location.href);
    _this.appUrls.unroutedUrlObj = new window.URI(src);
    _this.appUrls.routedUrlObj = new window.URI(appWindow.document.location.href);
    // Match an adaptor object based on the src location, or use default.
    var adaptor = _this;
    var adaptors = _this.getAdaptors();
    var protocolSkip = (_this.routerProtocol+'://').length;
    for( var match in adaptors ){
      if( src.substr(protocolSkip, match.length) === match ){
        adaptor = adaptors[match];
        break;
      }
    }
    adaptor.onWindow(appWindow);
    return adaptor;
  };

  this.onWindow = function(appWindow){
    var token = _this.getToken();
    if(!token){
      token = _this.appUrls.routedUrlObj.search(true).token;
      if(token){ _this.setToken(token); }
    }
    // Update any jQuery ajax call, if applicable.
    if('jQuery' in appWindow){
      appWindow.jQuery.ajaxPrefilter(function(options){
        options.url = _this.routeUrl(options.url);
        options.converters['text html'] = function(value){
          return value.replace(
            /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gm,
            function(url){ return _this.routeUrl(url); }
          );
        };
      });
    }

    appWindow.addEventListener('DOMContentLoaded',
      function(){ _this.onDOM(appWindow); });
    // Process body on load (unfortunately DOMready is too soon)
    appWindow.addEventListener('load',
      function(){ _this.onLoad(appWindow); });
  };

  this.onDOM = function(appWindow){
    return true;
    var scripts = appWindow.document.body.getElementsByTagName('script');
    for( var i = 0; i < scripts.length; i++){
      if( scripts[i].src && ( scripts[i].src.startsWith('//') || scripts[i].src.startsWith('http') ) ){
        var newSrc = _this.routeUrl(scripts[i].src, true);
        if( newSrc !== scripts[i].src ){
          var newScript = appWindow.document.createElement('script');
          newScript.src = newSrc;
          scripts[i].parentNode.replaceChild(newScript, scripts[i]);
        }
      }
    }
  };

  this.onLoad = function(appWindow){
    // Update links in <a> tags
    var aTags = appWindow.document.getElementsByTagName('a');
    for(var a=0; a < aTags.length; a++){
      var newUrl = _this.routeUrl(aTags[a].href);
      aTags[a].href = newUrl;
    }
    // Update actions in <form> tags
    var formTags = appWindow.document.getElementsByTagName('form');
    for(var f=0; f < formTags.length; f++){
      formTags[f].action = _this.routeUrl(formTags[f].action);
    }
  };
};

window.CodeOrgAdaptor = function(envService, parentObj){
    var _this;
    if(parentObj){
      _this = window.inherit(this, parentObj);
    }else{
      _this = window.inherit(this, new window.GenericAppAdaptor(envService));
    }
    var _parent = _this._parent;

    this.onWindow = function(appWindow){
      var token = _this.getToken();
      if(token){
        var urlObj = _this.appUrls.routedUrlObj.clone();
        if(!urlObj.hasQuery('token')){
          urlObj.addQuery('token', token);
          appWindow.document.location = urlObj.toString();
          return;
        }
      }
      _parent.onWindow(appWindow);
      if('jQuery' in appWindow){
        var triggers = {
          'studio.code.org/milestone/': _this.onAjaxMilestone,
          'studio.code.org/v3/sources/': _this.onSourceSubmit,
          '/v3/sources/': _this.onSourceSubmit
        };
        var protocolSkip = (_this.routerProtocol+'://').length;
        appWindow.jQuery(appWindow.document).ajaxSend(
          function( event, jqxhr, settings ) {
            var url = _this.unrouteUrl(settings.url);
            var skip = (settings.url[0] === '/' ? 0 : protocolSkip );
            for( var match in triggers ){
              if( url.substr(skip, match.length) === match ){
                triggers[match](event, jqxhr, settings);
              }
            }
          }
        );
      }
    };

    this.onAjaxMilestone = function(event, jqxhr, settings){
      var token = _this.getToken();
      if(token){
        var activity = _this.appUrls.unroutedUrlObj
          .clone()
          .removeQuery('token')
          .toString();
        _this.storeEvent(
          token,
          'http://adlnet.gov/expapi/verbs/completed',
          activity,
          settings.data
        );
      }
    };

    this.onSourceSubmit = function(event, jqxhr, settings){
      var token = _this.getToken();
      if(token && settings.type === 'PUT'){
        var activity = _this.appUrls.unroutedUrlObj
          .clone()
          .removeQuery('token')
          .toString();
        _this.storeEvent(
          token,
          'http://activitystrea.ms/schema/1.0/build',
          activity,
          {
            'type': 'javascript',
            'code': JSON.parse(settings.data).source
          }
        );
      }
    };
};

window.ScratchAdaptor = function(envService, parentObj){
    var _this;
    if(parentObj){
      _this = window.inherit(this, parentObj);
    }else{
      _this = window.inherit(this, new window.GenericAppAdaptor(envService));
    }
    var _parent = _this._parent;

    this.onWindow = function(appWindow){
      var token = _this.getToken();
      if(token){
        var urlObj = _this.appUrls.routedUrlObj.clone();
        if(!urlObj.hasQuery('token')){
          urlObj.addQuery('token', token);
          appWindow.document.location = urlObj.toString();
          return;
        }
      }
      if( appWindow.swfobject ){
        var swfobject = appWindow.swfobject;
        appWindow.swfobject = {
          'embedSWF': function(swfUrlStr, _1, _2, _3, _4, xiSwfUrlStr, flashvarsObj, _7, _8, _9){
            swfUrlStr = _this.routeUrl(swfUrlStr, true);
            xiSwfUrlStr = _this.routeUrl(xiSwfUrlStr, true);
            var urlOverrides = JSON.parse(decodeURIComponent(flashvarsObj.urlOverrides));
            for( var key in urlOverrides ){
              urlOverrides[key] = _this.routeUrl(urlOverrides[key], true);
            }
            console.log('new url overrides');
            console.log(urlOverrides);
            flashvarsObj.urlOverrides = encodeURIComponent(JSON.stringify(urlOverrides));
            swfobject.embedSWF(swfUrlStr, _1, _2, _3, _4, xiSwfUrlStr, flashvarsObj, _7, _8, _9);
          },
          'hasFlashPlayerVersion': swfobject.hasFlashPlayerVersion,
          'getObjectById': swfobject.getObjectById,
        };
      }
      if( appWindow.Scratch.INIT_DATA ){
        var routeObjURLValue = function(obj, key){ obj[key] = _this.routeUrl(obj[key], true); };
        routeObjURLValue(appWindow.Scratch.INIT_DATA.GLOBAL_URLS, 'media_url');
        routeObjURLValue(appWindow.Scratch.INIT_DATA.GLOBAL_URLS, 'static_url');
        routeObjURLValue(appWindow.Scratch.INIT_DATA.PROJECT, 'embedUrl');
        routeObjURLValue(appWindow.Scratch.INIT_DATA.COI, 'TARGET_DOMAIN');
      }
      _parent.onWindow(appWindow);
    };
};

/**
 * @ngdoc service
 * @name eduraamApp.AppAdaptor
 * @description
 * # AppAdaptor
 * Service in the eduraamApp.
 */
angular.module('eduraamApp').service('AppAdaptor', ['envService', window.GenericAppAdaptor]);
