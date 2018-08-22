'use strict';

/**
 * @ngdoc function
 * @nameProduit biblioWebApp.controller:MainController
 * @description
 * # MainController
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
.controller('AutoComCtrl', ['$scope', '$rootScope', '$location', '$http',  'autoComService', 
	function ($scope, $location, $rootScope, $http, autoComService) {
		
		
		/*  $scope.searchCriteria = {};
		 $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 150
                });
		
                produitService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
					console.log($scope.searchResult);
					
                });
            }; */
			
			 
		$scope.produits = [		 
		 autoComService.query(function(data) {
					
                    $scope.searchResult = data;
				
                })
		
		
		
        ];   
		
		
	
    }
]);