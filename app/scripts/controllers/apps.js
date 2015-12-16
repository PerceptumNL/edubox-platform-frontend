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
		'logo': '/images/quiz.svg',
		'url': 'https://www.duolingo.com.app.eduraam.nl'
	},
	{
		'id': 1,
		'name':'leestmeer',
		'description': 'Lekker lezen met behulp van deze leuke app.',
		'logo': '/images/ebook.svg',
		'url': 'http://platform.leestmeer.nl.app.eduraam.nl'
	}
];

angular.module('eduraamApp')
  .controller('AppsCtrl', ['$scope', '$location', '$routeParams', 'Apps',
		function ($scope, $location, $routeParams, Apps) {
			var apps = Apps.all(function(){});
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
