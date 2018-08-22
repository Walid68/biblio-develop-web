'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:produitCatCatCtrl
 * @description
 * # produitCatCatCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('ProduitCatCtrl', ['$scope', '$rootScope', '$route', '$location', 'produitCatService', 'produitCatCtrlData',
        function($scope, $rootScope, $route, $location, produitCatService, produitCatCtrlData) {
            $scope.searchResult = produitCatCtrlData.produits;
            $scope.searchCriteria = {};

            //If only one result on booking page go to booking produit page
            //if($route.current.$$route.originalPath === '/booking' && $scope.searchResult.content.length === 1){
            //	$location.path('/produit/' + $scope.searchResult.content[0].id + '/booking');
           // }

            //Search
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 300
                });

                produitCatService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

			//Filtre
			
            //Remove
            $scope.remove = function(produitCat) {
              
                $rootScope.showConfirmationMessage('PRODUIT.REMOVE.CONFIRMATION_MESSAGE', {
                    produitCatName: produitCat.name
                }, function() {
                    produitCatService.remove({id : produitCat.id}, function() {

                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
    .controller('ProduitCatManageCtrl', ['$scope', '$rootScope', 'produitCatService', 'produitCatManageCtrlData', '$location',
        function($scope, $rootScope, produitCatService, produitCatManageCtrlData, $location) {
            $scope.managedProduit = produitCatManageCtrlData.produitCat;
            $scope.operationMode = produitCatManageCtrlData.operationMode;

			
			  
                if($scope.managedProduit.image && $scope.managedProduit.image.filesize > 0) {
                    $scope.produitCat.image = {
                        name: $scope.managedProduit.image.filename,
                        mimeType: $scope.managedProduit.image.filetype,
                        fileSize: $scope.managedProduit.image.filesize,
                        contentBase64: $scope.managedProduit.image.base64
                    };
                }
                $scope.produitCat.description = angular.toJson($scope.managedProduitCat.description);
                $scope.produitCat.ref = angular.toJson($scope.managedProduitCat.ref);
				
				$scope.managedProduitCat.versionDate = moment($scope.managedProduitCat.versionDate).utc().format('YYYY-MM-DD[T]HH:mm[:00Z]');

                produitCatService.saveProduitCatInformation($scope.produitCatInformation, function() {
                    $location.path('/produit/home');
                });
				
			
            if($scope.operationMode === 'CREATE'){

            	//$scope.managedProduitCat.systeme = 'PAJE';
            	}else if($scope.operationMode === 'EDIT'){
            	$scope.managedProduitCat.eversionDate = moment($scope.managedProduitCat.versionDate).hours(0).minutes(0).seconds(0).format('YYYY-MM-DDTHH:mm:ssZ');
            }

            //Save
            $scope.save = function(isValid){


            	if(!isValid) {
                    return;
                }
            	$scope.managedProduitCat.startDate = moment($scope.managedProduitCat.startDate).utc().format('YYYY-MM-DD[T]HH:mm[:00Z]');
            	$scope.managedProduitCat.endDate = moment($scope.managedProduitCat.endDate).utc().add(23, 'hours').add(59, 'minutes').add(59, 'secondes').format('YYYY-MM-DD[T]HH:mm:ss[Z]');

                if ($scope.operationMode === 'CREATE') {


                    produitCatService.save($scope.managedProduitCat, function() {
                    	$rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produit/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {



                    produitCatService.update($scope.managedProduitCat, function() {
                    	$rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produit/home');
                    });
                }
            };

            //DatePicker
            $scope.open = function($event, opened) {
            	$scope.produitCatDate = false;
            	//$scope.produitEndDate = false;
            	$event.preventDefault();
            	$event.stopPropagation();
            	$scope[opened] = true;
            };
        }
    ])

	 .controller('ProduitCatFileManageCtrl', ['$scope', '$rootScope', '$location', '$route', 'produitCatManageCtrlData', 'fileManageCtrlData', 'produitCatFileService',
        function($scope, $rootScope, $location, $route, produitCatManageCtrlData, fileManageCtrlData, produitCatFileService) {

            $scope.produitCat = produitCatManageCtrlData.produitCat;
            $scope.operationMode = fileManageCtrlData.operationMode;
            $scope.managedFile = fileManageCtrlData.file;

            if($scope.managedFile.document !== undefined) {
                $scope.fileTemp = {
                    base64: $scope.managedFile.document.contentBase64,
                    filename: $scope.managedFile.document.name,
                    filesize: $scope.managedFile.document.fileSize,
                    filetype: $scope.managedFile.document.mimeType
                };
            }

            //Save
            $scope.save = function(isValid) {
                
                if (!isValid) { return; }

                if (typeof $scope.fileTemp !== 'undefined' && $scope.fileTemp !== null) {
                    if ($scope.fileTemp.filetype !== 'image/jpg' && $scope.fileTemp.filetype !== 'image/jpeg' &&
                        $scope.fileTemp.filetype !== 'application/pdf' && $scope.fileTemp.filetype !== 'application/msword' &&
                        $scope.fileTemp.filetype !== 'application/wps-office.docx' &&
						$scope.fileTemp.filetype !== 'application/dwg' &&
                        $scope.managedFile.document.mimeType !== 'image/jpg' && $scope.managedFile.document.mimeType !== 'image/jpeg' &&
                        $scope.managedFile.document.mimeType !== 'application/pdf' && $scope.managedFile.document.mimeType !== 'application/msword') {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.INVALID_DOCUMENT');
                        return;
                    } else {
                        $scope.managedFile.document = {
                            contentBase64: $scope.fileTemp.base64,
                            name: $scope.fileTemp.filename,
                            fileSize: $scope.fileTemp.filesize,
                            mimeType: $scope.fileTemp.filetype
                        };
                    }
                }

                if ($scope.operationMode === 'CREATE') {
                    produitCatFileService.save({ produitCatId: $route.current.params.produitCatId }, $scope.managedFile, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produitCat/' + $scope.produitCat.id +'/file/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
                    produitCatFileService.update($scope.managedFile, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produitCat/' + $scope.produitCat.id +'/file/home');
                    });
                }
            
            };
        }
    ])
    .controller('ProduitCatFileViewCtrl', ['$scope', '$rootScope', '$location', '$route', 'fileManageCtrlData',
    function($scope, $rootScope, $location, $route, fileManageCtrlData) {
        $scope.operationMode = fileManageCtrlData.operationMode;
        $scope.managedFile = fileManageCtrlData.file;
        $scope.produitCatId = $route.current.params.produitCatId;

        $scope.download = function() {
            window.open($rootScope.apiUrl + '/produitCat/' + $route.current.params.produitCatId + '/file/' + $route.current.params.id + '/download', '_blank', '');
        };

    }])

   ;
