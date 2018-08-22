'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:categorieToProduitCtrl
 * @description
 * # categorieToroduitCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('CategorieToProduitCtrl', ['$scope', '$rootScope', '$route', '$location', 'categorieToProduitService', 'categorieToProduitCtrlData', 
        function($scope, $rootScope, $route, $location, categorieToProduitService,  categorieToProduitCtrlData) {
            $scope.searchResult = categorieToProduitCtrlData.categorieToProduits;
			
			
            $scope.searchCriteria = {};
			

           
            //Search
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 100
                });

                categorieToProduitService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

	
        }
    ])
	
	

   ;
