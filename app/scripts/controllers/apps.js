'use strict';

/**
 * @ngdoc function
 * @name eduraamApp.controller:AppsCtrl
 * @description
 * # AppsCtrl
 * Controller of the eduraamApp
 */
var eduraamAppsMock = [
	{
		'id': 0,
		'name':'duolingo',
		'description': 'Leer nieuwe talen met behulp van deze leuke app.',
		'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Duolingo_logo.svg/2000px-Duolingo_logo.svg.png',
		'url': 'https://www.duolingo.com.app.eduraam.nl'
	},
	{
		'id': 1,
		'name':'leestmeer',
		'description': 'Lekker lezen met behulp van deze leuke app.',
		'logo': 'http://www.leestmeer.nl/LeestmeerLogo.png',
		'url': 'http://platform.leestmeer.nl.app.eduraam.nl'
	}
];

angular.module('eduraamApp')
  .controller('AppsCtrl', ['$scope', '$location', '$routeParams',
		function ($scope, $location, $routeParams) {
			if( 'id' in $routeParams && $routeParams.id !== ''){
				$scope.appRoutedUrl =
					eduraamAppsMock[parseInt($routeParams.id)].url;
			}else{
				$scope.loadApp = function(appId){
					$location.path('/app/'+appId+'/'); };
				$scope.apps = eduraamAppsMock;
			}
		}
  ]);
