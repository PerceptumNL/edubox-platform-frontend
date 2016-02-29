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

  this.activate = function(appWindow){
    console.log('Updating app frame');
    var routedUrl = new window.URI(appWindow.document.location.href);
    _this.routedHost = routedUrl.host();
    if(_this.routerDomain === ''){ _this.routerDomain = routedUrl.domain(); }
    _this.token = routedUrl.search(true).token;
    // Update any jQuery ajax call, if applicable.
    if('jQuery' in appWindow){
      appWindow.jQuery.ajaxPrefilter(function(options){
        console.log('Updating ajax call');
        options.url = _this.updateUrl(options.url, _this.token);
      });
    }
    // Process body on load (unfortunately DOMready is too soon)
    appWindow.addEventListener('load',
      function(){ _this.processBody(appWindow); });
  };

  this.processBody = function(appWindow){
    console.log('Updating app frame body');
    console.log('With _this.token as', _this.token);
    // Update links in <a> tags
    var aTags = appWindow.document.getElementsByTagName('a');
    for(var a=0; a < aTags.length; a++){
      console.log(aTags[a]);
      var newUrl = _this.updateUrl(aTags[a].href, _this.token);
      console.log(aTags[a].href, '=>', newUrl);
      aTags[a].href = newUrl;
    }
    // Update actions in <form> tags
    var formTags = appWindow.document.getElementsByTagName('form');
    for(var f=0; f < formTags.length; f++){
      console.log(formTags[a]);
      formTags[f].action = _this.updateUrl(formTags[f].action, _this.token);
    }
  };
};
