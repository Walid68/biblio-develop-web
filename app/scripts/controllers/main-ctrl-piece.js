'use strict';

/**
 * @ngdoc function
 * @nameProduit biblioWebApp.controller:MainController
 * @description
 * # MainController
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
.controller('AutoComPieceCtrl', ['$scope', '$http', '$rootScope', '$route', '$location', 'autoComPieceService', 'autoComPieceCtrlData',
	function ($scope, $http, $rootScope, $route, $location, autoComPieceService, autoComPieceCtrlData) {

	 $scope.searchResult = autoComPieceCtrlData.pieces;
				console.log($scope.searchResult);
				
				
             
		  	//Search
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10
                });

                autoComPieceService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

	
    }
]);