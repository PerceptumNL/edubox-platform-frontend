'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:BrowserCtrl
 * @description
 * # BrowserCtrl
 * Controller of the eduraamApp
 */
angular.module('eduraamApp')
  .controller('BrowserCtrl', ['$rootScope', function ($rootScope) {
    var _this = this;
    var browserFrame = angular.element(
        document.getElementById('browser-frame'));
    var browserContainer = angular.element(
        document.getElementById('browser-container'));

    this.getBrowserFrame = function(){
      return browserFrame;
    };

    this.getBrowserContainer = function(){
      return browserContainer;
    };

    var getMainContainer = function(){
      return angular.element(document.getElementById('main-container'));
    };

    this.open = function(url, dontShowFrame){
      _this.getBrowserFrame().attr('src', url);
      if( !dontShowFrame ){
        setTimeout(_this.ensureBrowserOnTop, 1);
      }
    };

    this.close = function(){
      _this.getBrowserFrame().attr('src', '');
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
