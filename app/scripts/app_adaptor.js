'use strict';

window.GenericAppAdaptor = function(routerDomain){
  var _this = this;
  this.routerDomain = routerDomain || '';

  this.getAdaptors = function(){
    return {
      'https://studio.code.org/s/': (new window.CodeOrgAdaptor(routerDomain, _this))
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
      if( urlObj.domain() === _this.routerDomain ){
        // Unhash subdomain
        var subdomain = urlObj.subdomain();
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

  this.routeUrl = function(url){
    var routing = {
      'code.org': true,
      'scratch.mit.edu': true,
      'google.com': true,
      'google-analytics': true
    };
    var token = _this.getToken();
    if( url[0] === '#'){
      return url;
    } else if( url[0] === '/'){
      if(token){
        return new window.URI(url).setQuery('token', token).toString();
      }
    }else{
      // convert url into a more manageable form.
      var urlObj = new window.URI(url);
      var host = urlObj.host();
      // if host should be routed
      if( routing[host] || routing[urlObj.domain()] ){
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
        return urlObj.toString();
      // If host is the same as the current routed host
      }else if( host === _this.routedHost ){
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
    console.log('Initialize adaptor for', src);
    // Match an adaptor object based on the src location, or use default.
    var adaptor = _this;
    var adaptors = _this.getAdaptors();
    for( var match in adaptors ){
      if( src.substr(0, match.length) === match ){
        adaptor = adaptors[match];
        break;
      }
    }
    adaptor.onWindow(appWindow);
    return adaptor;
  };

  this.onWindow = function(appWindow){
    console.log('Generic::onWindow');
    var token = _this.getToken();
    if(!token){
      var routedUrl = new window.URI(appWindow.document.location.href);
      _this.routedHost = routedUrl.host();
      token = routedUrl.search(true).token;
      if(token){ _this.setToken(token); }
    }
    // Update any jQuery ajax call, if applicable.
    if('jQuery' in appWindow){
      appWindow.jQuery.ajaxPrefilter(function(options){
        //console.log('Updating ajax call');
        options.url = _this.routeUrl(options.url);
      });
    }
    // Process body on load (unfortunately DOMready is too soon)
    appWindow.addEventListener('load',
      function(){ _this.onDOM(appWindow); });
  };

  this.onDOM = function(appWindow){
    console.log('Generic::onDOM');
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

window.CodeOrgAdaptor = function(routerDomain, parentObj){
    var _this;
    if(parentObj){
      _this = window.inherit(this, parentObj);
    }else{
      _this = window.inherit(this, new window.GenericAppAdaptor(routerDomain));
    }
    var _parent = _this._parent;

    this.onWindow = function(appWindow){
      console.log('CodeOrg::onWindow');
      var token = _this.getToken();
      if(token){
        var urlObj = window.URI(appWindow.document.location.href);
        if(!urlObj.hasQuery('token')){
          urlObj.addQuery('token', token);
          console.log('Reloading frame to', urlObj.toString());
          appWindow.document.location = urlObj.toString();
          return;
        }
      }
      _parent.onWindow(appWindow);
      if('jQuery' in appWindow){
        console.log('intercept on code.org ajax init.');
        appWindow.jQuery(appWindow.document).ajaxSend(
          function( event, jqxhr, settings ) {
            console.log('intercepting ajax call');
            if( _this.unrouteUrl(settings.url).substr(0,34) ===
				'https://studio.code.org/milestone/' ){
              console.log('Completed ', appWindow.document.location.pathname);
              console.log(settings);
              if(token && settings.data.testResult === 100){
                _this.storeEvent(
                  token,
                  'http://adlnet.gov/expapi/verbs/completed',
                  appWindow.document.location.pathname,
                  settings.data.program
                );
              }
            }
          }
        );
      }
    };
};
