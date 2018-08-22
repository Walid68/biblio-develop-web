'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:produitCtrl
 * @description
 * # produitCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('ProduitCtrl', ['$scope', '$http','$rootScope', '$route', '$location', 'produitService', 'produitCtrlData', 
        function($scope, $http,$rootScope, $route, $location, produitService,  produitCtrlData) {
            $scope.searchResult = produitCtrlData.produits;
			
		    $scope.searchCriteria = {};
            $scope.nameProduit = '';
			
			
			$scope.searchByName = function(search) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    size: 10,
                    search: search
					
                });
				
                produitService.search(searchCriteria, function(data) {
                    $scope.searchResult = data;
					
                });
            };

			$scope.clear = function() {
                $scope.search(0);
            };
           
            //Search
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10
                });
		
                produitService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
					
					
                });
            };
			
			
		/* $scope.produits = [
		  	$scope.search = function(search) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    size: 150,
                    search: search
					
                });
				
                produitService.search(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            }
		   ] ;  */
			
            //Remove
            $scope.remove = function(produit) {
              
                $rootScope.showConfirmationMessage('PRODUIT.REMOVE.CONFIRMATION_MESSAGE', {
                    produitName: produit.name
                }, function() {
                    produitService.remove({id : produit.id}, function() {

                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
	

 
    .controller('ProduitManageCtrl', ['$scope', '$rootScope', 'produitService', 'produitManageCtrlData', '$filter', '$location',  
        function($scope, $rootScope, produitService, produitManageCtrlData,  $filter,   $location) {
		
			
            $scope.managedProduit = produitManageCtrlData.produit;
			
            $scope.operationMode  = produitManageCtrlData.operationMode;
			$scope.categories     = produitManageCtrlData.categories.content;
			
			$scope.pieces         = produitManageCtrlData.pieces.content;
			
			$scope.codes          = produitManageCtrlData.codes;
			
			$scope.managedProduit.categories = [];
			$scope.managedProduit.pieces = [];
			
						
				
		
			
		
            
			//Get Categories
			 
            if(produitManageCtrlData.produit.categorieToProduits !== undefined && produitManageCtrlData.produit.categorieToProduits.length > 0) {
                $scope.managedProduit.categorieToProduits.forEach(function (categorie) {
			
                        $scope.managedProduit.categories.push(categorie.categorie);
						
                });
				
			}
				//Get Pieces
			 
			  if(produitManageCtrlData.produit.produitToPieces !== undefined && produitManageCtrlData.produit.produitToPieces.length > 0 ) {
                $scope.managedProduit.produitToPieces.forEach(function (piece) {
						
                        $scope.managedProduit.pieces.push(piece.piece);
                    
                });
			}  
			
            if($scope.managedProduit.versionDate !== null && $scope.managedProduit.versionDate !== undefined) {
                $scope.versionDateTemp = new Date(produitManageCtrlData.produit.versionDate);
            } else {
                $scope.versionDateTemp = '';
            }

		
			
            if($scope.operationMode === 'CREATE'){

                       	}
						
		
            //Save
            $scope.save = function(isValid){


            	if(!isValid) {
					
                        return;
                    
                }
				
			
				// versiondate
                $scope.managedProduit.versionDate = $filter('date')($scope.versionDateTemp, 'dd/MM/yyyy');
            
							
                if ($scope.operationMode === 'CREATE') {


                    produitService.save($scope.managedProduit, function() {
                    	$rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produit/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {


                    produitService.update($scope.managedProduit, function() {
                    	$rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produit/home');
                    });
                }
            };
			
			
             //DatePicker
           $scope.open = function($event, opened) {
				$scope.maxStartDate = '30-05-2015';
               	$event.preventDefault();
            	$event.stopPropagation();
            	$scope[opened] = true;
            };
        }
    ])
   
.controller('ProduitFileCtrl', ['$scope', '$rootScope', '$location', 'produitManageCtrlData', 'fileManageCtrlData',
        function($scope, $rootScope, $location ,produitManageCtrlData, fileManageCtrlData) {
            $scope.produit = produitManageCtrlData.produit;
            $scope.searchResult = fileManageCtrlData.files;
        }
    ])
  .controller('ProduitFileManageCtrl', ['$scope', '$rootScope', '$location', '$route', 'produitManageCtrlData', 'fileManageCtrlData', 'produitFileService',
        function($scope, $rootScope, $location, $route, produitManageCtrlData, fileManageCtrlData, produitFileService) {

            $scope.produit = produitManageCtrlData.produit;
            $scope.operationMode = fileManageCtrlData.operationMode;
            $scope.managedFile = fileManageCtrlData.file;

            if($scope.managedFile.document !== undefined) {
                $scope.fileTemp = {
                    base64: 	$scope.managedFile.document.contentBase64,
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
					$scope.fileTemp.filetype !== 'image/png' && $scope.fileTemp.filetype !== 'image/png' &&
					$scope.fileTemp.filetype !== 'image/PNG' && $scope.fileTemp.filetype !== 'image/PNG' &&
                        $scope.fileTemp.filetype !== 'application/pdf' && $scope.fileTemp.filetype !== 'application/msword' &&
                        $scope.fileTemp.filetype !== 'application/wps-office.docx' &&
						$scope.fileTemp.filetype !== 'application/dwg' &&
                        $scope.managedFile.document.mimeType !== 'image/jpg' && $scope.managedFile.document.mimeType !== 'image/jpeg' &&
						$scope.managedFile.document.mimeType !== 'image/png' && $scope.managedFile.document.mimeType !== 'image/png' &&
						$scope.managedFile.document.mimeType !== 'image/PNG' && $scope.managedFile.document.mimeType !== 'image/PNG' &&
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
                    produitFileService.save({ produitId: $route.current.params.produitId }, $scope.managedFile, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produit/' + $scope.produit.id +'/documentation/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
                    produitFileService.update($scope.managedFile, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/produit/' + $scope.produit.id +'/documentation/home');
                    });
                }
            
            };
        }
    ])
    .controller('ProduitFileViewCtrl', ['$scope', '$rootScope', '$location', '$route', 'fileManageCtrlData', 
    function($scope, $rootScope, $location, $route, fileManageCtrlData) {
        $scope.operationMode = fileManageCtrlData.operationMode;
        $scope.managedFile = fileManageCtrlData.file;
        $scope.produitId = $route.current.params.produitId;

        $scope.download = function() {
            window.open($rootScope.apiUrl + '/produit/' + $route.current.params.produitId + '/documentation/' + $route.current.params.id + '/download', '_blank', '');
        };
		
    }]) 
	
	.controller('ProduitInformationManageCtrl', ['$scope', '$rootScope', '$translate', 'produitService', 'produitInformationManageCtrlData', '$location',
        function($scope, $rootScope, $translate, produitService, produitInformationManageCtrlData,  $location) {

		
            $scope.produit = produitInformationManageCtrlData.produit;
             if (produitInformationManageCtrlData.produitInformation) {
                $scope.managedProduitInformation = {
                    videoLink: produitInformationManageCtrlData.produitInformation.videoLink
					/* ,
                    description: angular.fromJson(produitInformationManageCtrlData.produitInformation.description) */
                };
                $scope.operationMode = 'EDIT';
            } else {
                $scope.operationMode = 'CREATE';
            } 

           
            //Save
            $scope.save = function(isValid) {
                if (!isValid) {
                    return;
                }
                $scope.produitInformation = {
                    videoLink: $scope.managedProduitInformation.videoLink
                };
                if ($scope.managedProduitInformation.image && $scope.managedProduitInformation.image.filesize > 0) {
                    $scope.produitInformation.image = {
                        name: $scope.managedProduitInformation.image.filename,
                        mimeType: $scope.managedProduitInformation.image.filetype,
                        fileSize: $scope.managedProduitInformation.image.filesize,
                        base64: $scope.managedProduitInformation.image.base64
                    };
                }
				 if ($scope.managedProduitInformation.photo && $scope.managedProduitInformation.photo.filesize > 0) {
                    $scope.produitInformation.photo = {
                        name: $scope.managedProduitInformation.photo.filename,
                        mimeType: $scope.managedProduitInformation.photo.filetype,
                        fileSize: $scope.managedProduitInformation.photo.filesize,
                        base64: $scope.managedProduitInformation.photo.base64
                    };
                }
                /* $scope.produitInformation.description = angular.toJson($scope.managedProduitInformation.description); */
                $scope.produitInformation.produitId = $scope.produit.id;
console.log(+$scope.produitInformation);
                produitService.saveProduitInformation($scope.produitInformation, function() {
                    $location.path('/produit/home');
                });
            };
        }
    ])
    .controller('ProduitInformationView1Ctrl', ['$scope',  '$sce', '$rootScope', '$translate',  'produitInformationView1CtrlData', 'produitManageCtrlData',  '$location', 
        function($scope, $sce, $rootScope, $translate,   produitInformationView1CtrlData, produitManageCtrlData,  $location) {
        
		
		
		
			$scope.produit = produitManageCtrlData.produit;
			
			$scope.produit.id = produitManageCtrlData.produit.id;
				
			
			$scope.files=  produitInformationView1CtrlData.files.content; 
			
			$scope.categoriess = produitInformationView1CtrlData.categoriess.content; 
  
	
			
			$scope.managedProduit = produitManageCtrlData.produit;		
			$scope.categorieToProduits = produitManageCtrlData.produit.categorieToProduits;	
					
			$scope.categories     = produitManageCtrlData.categories.content;
				
			$scope.pieces         = produitManageCtrlData.pieces.content;
		

			$scope.managedProduit.categories = [];
			$scope.managedProduit.pieces = [];
			
			 if(produitManageCtrlData.produit.categorieToProduits !== undefined && produitManageCtrlData.produit.categorieToProduits.length > 0) {
                $scope.managedProduit.categorieToProduits.forEach(function (categorie) {
			
                        $scope.managedProduit.categories.push(categorie.categorie);
						
                });
				
			}
				//Get Pieces
			 
			  if(produitManageCtrlData.produit.produitToPieces !== undefined && produitManageCtrlData.produit.produitToPieces.length > 0 ) {
                $scope.managedProduit.produitToPieces.forEach(function (piece) {
						
                        $scope.managedProduit.pieces.push(piece.piece);
                    
                });
			} 
			
				   $scope.selectCat = function() {
                
			 	$location.url('/categorie/home/');
            };
			   $scope.selectPiec = function() {
                
			   
				$location.url('/piece/home/');
            };
			
            //$scope.produit = produitInformationViewCtrlData.produit;
			
            $scope.produitInformation = produitInformationView1CtrlData.produitInformation;
            
			
            $scope.getVideoLink = function() {
                if ($scope.produitInformation.videoLink.match(/https?:\/\/vimeo\.com\//g)) {
                    $scope.produitInformation.videoLink = $scope.produitInformation.videoLink.replace('vimeo.com', 'player.vimeo.com/video');
                }
                return $sce.trustAsResourceUrl($scope.produitInformation.videoLink + '?title=0&byline=0&portrait=0');
            };

           
        }
    ])
	.controller('ProduitInformationViewCtrl', ['$scope',  '$sce', '$rootScope', '$translate',  'produitInformationViewCtrlData',  
        function($scope, $sce, $rootScope, $translate,   produitInformationViewCtrlData) {
        
			
          $scope.produit = produitInformationViewCtrlData.produit;
			
            $scope.produitInformation = produitInformationViewCtrlData.produitInformation;
            
			
            $scope.getVideoLink = function() {
                if ($scope.produitInformation.videoLink.match(/https?:\/\/vimeo\.com\//g)) {
                    $scope.produitInformation.videoLink = $scope.produitInformation.videoLink.replace('vimeo.com', 'player.vimeo.com/video');
                }
                return $sce.trustAsResourceUrl($scope.produitInformation.videoLink + '?title=0&byline=0&portrait=0');
            };

           
        }
    ])


   ;
