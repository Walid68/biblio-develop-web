'use strict';

/**
 * @ngdoc function
 * @nameProduit biblioWebApp.controller:MainController
 * @description
 * # MainController
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
.controller('AutoComPieceCtrl', ['$scope', '$rootScope', '$location', '$http',  'autoComPieceService', 
	function ($scope, $location, $rootScope, $http, autoComPieceService) {
		
		
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
			
			 
		$scope.pieces = [		 
		 autoComPieceService.query(function(data) {
					
                    $scope.searchResult = data;
				
                })
		
		
		
        ];   
		
		
	
    }
]);