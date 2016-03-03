'use strict';

window.GenericAppAdaptor = function(routerDomain){
  var _this = this;
  this.routerDomain = routerDomain || '';

  this.updateUrl = function(url, token){
    var routing = {
      'code.org': true,
      'scratch.mit.edu': true,
      'google.com': true,
      'google-analytics': true
    };
    if( url[0] === '#'){
      return url;
    } else if( url[0] === '/'){
      if(token){
        return new window.URI(url).addQuery('token', token).toString();
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
          urlObj = urlObj.addQuery('token', token);
        }
        return urlObj.toString();
      // If host is the same as the current routed host
      }else if( host === _this.routedHost ){
        // Only add the token if applicable.
        if(token){
          return urlObj.addQuery('token', token).toString();
        }
      }
    }
    // If no adaption rule applied, return the original url
    return url;
  };

  /**
   * Initialize adaptor depending on the src location of the app window.
   * @static
   * @param appWindow - reference to app frame's window.
   * @param routerDomain - the domain of the router (optional)
   **/
  this.init = function(appWindow, routerDomain){
    var src = appWindow.document.location.href;
    // Mapping of url prefix matches and adaptor objects
    var adaptors = {
      'https://studio.code.org/s/': window.CodeOrgAdaptor
    };
    // Match an adaptor object based on the src location, or use default.
    var AdaptorObj = window.GenericAppAdaptor;
    for( var match in adaptors ){
      if( src.substring(0, match.length-1) === match ){
        AdaptorObj = adaptors[match];
        break;
      }
    }
    // Initialize adaptor and trigger onWindow.
    (new AdaptorObj(routerDomain)).onWindow(appWindow);
  };

  this.onWindow = function(appWindow){
    var routedUrl = new window.URI(appWindow.document.location.href);
    _this.routedHost = routedUrl.host();
    if(_this.routerDomain === ''){ _this.routerDomain = routedUrl.domain(); }
    _this.token = routedUrl.search(true).token;
    // Update any jQuery ajax call, if applicable.
    if('jQuery' in appWindow){
      appWindow.jQuery.ajaxPrefilter(function(options){
        //console.log('Updating ajax call');
        options.url = _this.updateUrl(options.url, _this.token);
      });
    }
    // Process body on load (unfortunately DOMready is too soon)
    appWindow.addEventListener('load',
      function(){ _this.onDOM(appWindow); });
  };

  this.onDOM = function(appWindow){
    // Update links in <a> tags
    var aTags = appWindow.document.getElementsByTagName('a');
    for(var a=0; a < aTags.length; a++){
      var newUrl = _this.updateUrl(aTags[a].href, _this.token);
      aTags[a].href = newUrl;
    }
    // Update actions in <form> tags
    var formTags = appWindow.document.getElementsByTagName('form');
    for(var f=0; f < formTags.length; f++){
      formTags[f].action = _this.updateUrl(formTags[f].action, _this.token);
    }
  };
};

window.CodeOrgAdaptor = function(routerDomain){
    var _this = window.inherit(this, new window.GenericAppAdaptor(routerDomain));
    var _parent = _this._parent;

    this.onWindow = function(appWindow){
      _parent.onWindow(appWindow);
      if('jQuery' in appWindow){
        appWindow.jQuery(document).ajaxSend(function( event, jqxhr, settings ) {
          if( settings.url.substring(0,34) === 'https://studio.code.org/milestone/' ){
            console.log('Completed ', appWindow.document.location.path);
          }
        });
      }
    };
};
