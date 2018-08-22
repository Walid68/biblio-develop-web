'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:categorieCtrl
 * @description
 * # CategorieCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('CategorieCtrl', ['$scope', '$rootScope', '$translate', 'categorieService', 'categorieCtrlData',
        function($scope, $rootScope, $translate, categorieService, categorieCtrlData) {
            $scope.searchResult = categorieCtrlData.categories;
            $scope.searchCriteria = {};
			
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10
                });
                categorieService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
					
                });
            };
 //console.log("je suis laaaa" +$scope.searchCriteria);
            $scope.clear = function() {
                $scope.search(0);
            };

		    $scope.remove = function(row) {

                $rootScope.showConfirmationMessage('CATEGORIE.REMOVE.CONFIRMATION_MESSAGE', {
                    categorieName: row.fullName
                }, function() {

                    categorieService.remove(row, function() {
                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
    .controller('CategorieManageCtrl', ['$scope', '$rootScope', '$translate', '$location', 'categorieService', 'categorieManageCtrlData',
        function($scope, $rootScope, $translate, $location, categorieService, categorieManageCtrlData) {
            $scope.managedCategorie = categorieManageCtrlData.categorie;
            $scope.operationMode = categorieManageCtrlData.operationMode;
           
		
		
            $scope.save = function(isValid) {
                if(!isValid) {
                    return;
                }
				

                if ($scope.operationMode === 'CREATE') {
				
                    categorieService.save($scope.managedCategorie, function() {
						  $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/categorie/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
					
					 categorieService.update($scope.managedCategorie, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                     
                          $location.path('/categorie/home');
                         
                         
                    });
                }
            };
			  

        }
		])
		/* .controller('CategorieToProduitGetProduitCtrl', ['$scope', '$rootScope', '$translate', '$location', 'categorieService', 'categorieToProduitGetProduitManageCtrlData',
        function($scope, $rootScope, $translate, $location, categorieService, categorieToProduitGetProduitCtrlData) {
           
         $scope.searchResult = categorieToProduitGetProduitCtrlData.produits;
		  $scope.categorie = categorieToProduitGetProduitCtrlData.enfant;
		 console.log('produits');
            $scope.searchCriteria = {};
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
					categorieId: $scope.categorie.id,
                    page: page,
                    size: 10
                });
                categorieService.getProduitsByCategorie(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

           
        }
    ]) */
	
	
	;
