'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:AppsCtrl
 * @description
 * # AppsCtrl
 * Controller of the eduraamApp
 */
var eduraam_apps_mock = [
	{
		'id': 0,
		'name':'duolingo',
		'description': "Leer nieuwe talen met behulp van deze leuke app.",
		'logo': "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Duolingo_logo.svg/2000px-Duolingo_logo.svg.png",
		'url': "https://www.duolingo.com.app.eduraam.nl"
	},
	{
		'id': 1,
		'name':'leestmeer',
		'description': "Lekker lezen met behulp van deze leuke app.",
		'logo': "http://www.leestmeer.nl/LeestmeerLogo.png",
		'url': "http://www.leestmeer.nl.app.eduraam.nl"
	}
];

angular.module('eduraamApp')
  .controller('AppsCtrl', ['$scope', '$location', '$routeParams', '$sce',
		function ($scope, $location, $routeParams, $sce) {
			if( 'id' in $routeParams && $routeParams['id'] !== ""){
				$scope.app_routed_url = $sce.trustAsResourceUrl(
						eduraam_apps_mock[parseInt($routeParams['id'])].url);

			}else{
				$scope.loadApp = function(app_id){
					$location.path("/app/"+app_id+"/"); };
				$scope.apps = eduraam_apps_mock;
			}
		}
  ]);
