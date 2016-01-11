'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:AppCtrl
 * @description Dealing with launching an individual app
 * # AppCtrl
 * Controller of the eduraamApp
 */

angular.module('eduraamApp')
  .controller('AppCtrl', ['$scope', '$routeParams', 'Apps',
		function ($scope, $routeParams, Apps) {
			$scope.appLaunchUrl = Apps.getLaunchUrl(
					$routeParams.group, $routeParams.app);
		}
  ]);
