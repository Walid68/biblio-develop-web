'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:objetCtrl
 * @description
 * # ObjetCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('ObjetCtrl', ['$scope', '$rootScope', '$translate', 'objetService', 'objetCtrlData',
        function($scope, $rootScope, $translate, objetService, objetCtrlData) {
            $scope.searchResult = objetCtrlData.objets;
            $scope.searchCriteria = {};
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10
                });
                objetService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

            $scope.clear = function() {
                $scope.search(0);
            };

		    $scope.remove = function(row) {

                $rootScope.showConfirmationMessage('CATEGORIE.REMOVE.CONFIRMATION_MESSAGE', {
                    objetName: row.fullName
                }, function() {

                    objetService.remove(row, function() {
                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
    .controller('ObjetManageCtrl', ['$scope', '$rootScope', '$translate', '$location', 'objetService', 'objetManageCtrlData',
        function($scope, $rootScope, $translate, $location, objetService, objetManageCtrlData) {
            $scope.managedObjet = objetManageCtrlData.objet;
            $scope.operationMode = objetManageCtrlData.operationMode;
           
		
		
            $scope.save = function(isValid) {
                if(!isValid) {
                    return;
                }
				

                if ($scope.operationMode === 'CREATE') {
				
                    objetService.save($scope.managedObjet, function() {
						  $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/objet/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
					
					 objetService.update($scope.managedObjet, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                     
                          $location.path('/objet/home');
                         
                         
                    });
                }
            };
			  

        }
		])
		
	
	
	;
