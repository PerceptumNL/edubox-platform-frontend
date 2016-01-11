'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:AppListCtrl
 * @description Dealing with displaying a list of apps
 * # AppListCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('AppListCtrl', ['$scope', '$location', 'Apps',
		function ($scope, $location, Apps) {
			var apps = Apps.all(function(){
				$scope.groups = apps.groups; });
			$scope.loadApp = function(group, app){
				$location.path('/apps/'+group+'/'+app+'/'); };
			$scope.groups = [];
		}
  ]);
