'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:UnitCtrl
 * @description Dealing with launching an individual learning unit
 * # UnitCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('UnitCtrl', ['$scope', '$routeParams', 'Units',
      function ($scope, $routeParams, Units) {
		var URI = window.URI;
        $scope.appLaunchUrl = Units.getLaunchUrl(
          $routeParams.group, $routeParams.unit);
        $scope.$on('$viewContentLoaded', function(){
          angular.element(document.getElementById('app-frame'))
            .on('load', function(){
              console.log('Updating app frame links');
              var routing = {
                'code.org': true,
                'scratch.mit.edu': true,
                'google.com': true,
                'google-analytics': true
              };
              var routedUrl = new URI(this.contentDocument.location.href);
              var routerDomain = routedUrl.domain();
              var token = routedUrl.search(true).token;
              console.log("Token found: "+token);
              var updateUrl = function(url, ignoreToken){
                console.log('Updating URL: '+url);
                if( url[0] === '/'){
                  console.log('Relative url found');
                  if(!ignoreToken && token){
                    console.log("Add token: "+token);
                    return new URI(url).addQuery('token', token).toString();
                  }
                }else{
                  console.log('Absolute url found');
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
                      console.log("Add token: "+token);
                    }
                    return urlObj.toString();
                  }
                }
                // If no adaption rule applied, return the original url
                return url;
              };
              // Update any jQuery ajax call, if applicable.
              if('jQuery' in this.contentWindow){
                this.contentWindow.jQuery.ajaxPrefilter(function(options){
                  options.url = updateUrl(options.url);
                });
              }
              // Update links in <a> tags
              var aTags = this.contentDocument.getElementsByTagName('a');
              for(var a=0; a < aTags.length; a++){
                aTags[a].href = updateUrl(aTags[a].href);
              }
              // Update actions in <form> tags
              var formTags = this.contentDocument.getElementsByTagName('form');
              for(var f=0; f < formTags.length; f++){
                formTags[f].action = updateUrl(formTags[f].action);
              }
            });
        });
      }
  ]);
