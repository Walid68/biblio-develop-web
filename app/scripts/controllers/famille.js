'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:familleCtrl
 * @description
 * # FamilleCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('FamilleCtrl', ['$scope', '$rootScope', '$translate', 'familleService', 'familleCtrlData',
        function($scope, $rootScope, $translate, familleService, familleCtrlData) {
            $scope.searchResult = familleCtrlData.familles;
            $scope.searchCriteria = {};
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10
                });
                familleService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

            $scope.clear = function() {
                $scope.search(0);
            };

		    $scope.remove = function(row) {

                $rootScope.showConfirmationMessage('CATEGORIE.REMOVE.CONFIRMATION_MESSAGE', {
                    familleName: row.fullName
                }, function() {

                    familleService.remove(row, function() {
                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
    .controller('FamilleManageCtrl', ['$scope', '$rootScope', '$translate', '$location', 'familleService', 'familleManageCtrlData',
        function($scope, $rootScope, $translate, $location, familleService, familleManageCtrlData) {
            $scope.managedFamille = familleManageCtrlData.famille;
			$scope.trigrammeCodes = familleManageCtrlData.trigrammeCodes;
	
            $scope.operationMode  = familleManageCtrlData.operationMode;
           
		
		
            $scope.save = function(isValid) {
                if(!isValid) {
                    return;
                }
				

                if ($scope.operationMode === 'CREATE') {
				
                    familleService.save($scope.managedFamille, function() {
						  $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/famille/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
					
					 familleService.update($scope.managedFamille, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                     
                          $location.path('/famille/home');
                         
                        
                    });
                }
            };
			  

        }
		])
	
	
	;
