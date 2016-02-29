'use strict';

function GenericAppAdaptor(){}

GenericAppAdaptor.prototype.updateUrl = function(url, ignoreToken){
  var URI = window.URI;
  if( url[0] === '/'){
    if(!ignoreToken && token){
      return new URI(url).addQuery('token', token).toString();
    }
  }else{
    // convert url into a more manageable form.
    var urlObj = new URI(url);
    var host = urlObj.host();
    // if host should be routed
    if( routing[host] || routing[urlObj.domain()] ){
      // Construct the routed host to send the request to.
      var routedHost = '';
      for (var i=0; i < host.length; i++) {
        routedHost += host.charCodeAt(i).toString(16);
      }
      routedHost += '.'+routerDomain;
      urlObj = urlObj.host(routedHost);

      // Add the token if applicable.
      if(!ignoreToken && token){
        urlObj = urlObj.addQuery('token', token);
      }
      return urlObj.toString();
    }
  }
  // If no adaption rule applied, return the original url
  return url;
}

GenericAppAdaptor.prototype.activate = function(appWindow){
  console.log('Updating app frame');
  var routing = {
    'code.org': true,
    'scratch.mit.edu': true,
    'google.com': true,
    'google-analytics': true
  };
  var URI = window.URI;
  var routedUrl = new URI(appWindow.document.location.href);
  var routerDomain = routedUrl.domain();
  var token = routedUrl.search(true).token;
  // Update any jQuery ajax call, if applicable.
  if('jQuery' in appWindow){
    appWindow.jQuery.ajaxPrefilter(function(options){
      console.log('Updating ajax call');
      options.url = this.updateUrl(options.url);
      console.log('New url:', options.url);
    });
    //TODO: uncomment: this.contentWindow.jQuery.holdReady(false);
  }
  // Update links in <a> tags
  var aTags = appWindow.document.getElementsByTagName('a');
  for(var a=0; a < aTags.length; a++){
    aTags[a].href = this.updateUrl(aTags[a].href);
  }
  // Update actions in <form> tags
  var formTags = appWindow.document.getElementsByTagName('form');
  for(var f=0; f < formTags.length; f++){
    formTags[f].action = this.updateUrl(formTags[f].action);
  }
}

/**
 * @ngdoc service
 * @name eduraamApp.appAdaptor
 * @description
 * # appAdaptor
 * Service in the eduraamApp.
 */
angular.module('eduraamApp')
  .service('appAdaptor', function () {
	return GenericAppAdaptor();
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
