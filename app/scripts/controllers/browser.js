'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:BrowserCtrl
 * @description
 * # BrowserCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('BrowserCtrl', ['$rootScope', 'Events', 'AppAdaptor',
      function ($rootScope, Events, AppAdaptor) {
        var _this = this;

        AppAdaptor.storeEvent = Events.store;
        window.activateAppAdaptor = function(appWindow){
          AppAdaptor = AppAdaptor.init(appWindow);
        };

        var browserFrame = document.getElementById('browser-frame');
        var browserContainer = angular.element(
            document.getElementById('browser-container'));

        this.getBrowserContainer = function(){ return browserContainer; };
        var getMainContainer = function(){
          return angular.element(document.getElementById('main-container'));
        };

/*        var fetchAndLoad = function(url, frame){
          var doc = frame.contentDocument || frame.contentWindow.document;
          $http({ method: 'GET', url: url })
            .then(function(response){
              var data = response.data;
              var routedData = data.replace(
                  /https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gm,
                  function(url){ return AppAdaptor.routeUrl(url); });
              doc.open();
              doc.write(routedData);
              doc.close();
            }, function(){
              //TODO: Notify user something went wrong.
            });
        };
*/

        this.open = function(url, dontShowFrame){
          angular.element(browserFrame).attr('src', url);
//          fetchAndLoad(url, browserFrame);
          if( !dontShowFrame ){
            setTimeout(_this.ensureBrowserOnTop, 1);
          }
        };

        var clearFrame = function(frame){
          var doc = frame.contentDocument || frame.contentWindow.document;
          doc.open();
          doc.write('');
          doc.close();
        };

        this.close = function(){
          clearFrame(browserFrame);
          setTimeout(_this.ensureMainOnTop, 1);
        };

        this.ensureBrowserOnTop = function(){
          var bc = _this.getBrowserContainer();
          var mc = getMainContainer();
          mc.addClass('hide');
          bc.removeClass('hide');
        };

        this.ensureMainOnTop = function(){
          var bc = _this.getBrowserContainer();
          var mc = getMainContainer();
          bc.addClass('hide');
          mc.removeClass('hide');
        };

        $rootScope.$on('$routeChangeStart', function(){
          setTimeout(_this.ensureMainOnTop,1);
        });
        angular.element(document.getElementById('logo-home-btn')).on('click',
            function(){ setTimeout(_this.ensureMainOnTop, 1);});
        window.EDRMBrowser = this;
  }]);
