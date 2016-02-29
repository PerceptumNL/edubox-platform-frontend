'use strict';

function GenericAppAdaptor(routerDomain){
  this.routerDomain = routerDomain || '';
}

GenericAppAdaptor.prototype.updateUrl = function(url, token){
  var routing = {
    'code.org': true,
    'scratch.mit.edu': true,
    'google.com': true,
    'google-analytics': true
  };
  if( url[0] === '/'){
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
    }
  }
  // If no adaption rule applied, return the original url
  return url;
};

GenericAppAdaptor.prototype.activate = function(appWindow){
  console.log('Updating app frame');
  var routedUrl = new window.URI(appWindow.document.location.href);
  this.routerDomain = routedUrl.domain();
  var token = routedUrl.search(true).token;
  // Update any jQuery ajax call, if applicable.
  if('jQuery' in appWindow){
    appWindow.jQuery.ajaxPrefilter(function(options){
      console.log('Updating ajax call');
      options.url = this.updateUrl(options.url, token);
      console.log('New url:', options.url);
    });
    //TODO: uncomment: this.contentWindow.jQuery.holdReady(false);
  }
  // Update links in <a> tags
  var aTags = appWindow.document.getElementsByTagName('a');
  for(var a=0; a < aTags.length; a++){
    aTags[a].href = this.updateUrl(aTags[a].href, token);
  }
  // Update actions in <form> tags
  var formTags = appWindow.document.getElementsByTagName('form');
  for(var f=0; f < formTags.length; f++){
    formTags[f].action = this.updateUrl(formTags[f].action, token);
  }
};
