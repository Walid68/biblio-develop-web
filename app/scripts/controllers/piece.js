'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:pieceCtrl
 * @description
 * # PieceCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('PieceCtrl', ['$scope', '$rootScope', '$translate', 'pieceService', 'pieceCtrlData',
        function($scope, $rootScope, $translate, pieceService, pieceCtrlData) {
            $scope.searchResult = pieceCtrlData.pieces;
            $scope.searchCriteria = {};
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10
                });
                pieceService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

            $scope.clear = function() {
                $scope.search(0);
            };

		    $scope.remove = function(row) {

                $rootScope.showConfirmationMessage('CATEGORIE.REMOVE.CONFIRMATION_MESSAGE', {
                    pieceName: row.fullName
                }, function() {

                    pieceService.remove(row, function() {
                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
    .controller('PieceManageCtrl', ['$scope', '$rootScope', '$translate', '$location', 'pieceService', 'pieceManageCtrlData',
        function($scope, $rootScope, $translate, $location, pieceService, pieceManageCtrlData) {
            $scope.managedPiece = pieceManageCtrlData.piece;
			$scope.codes = pieceManageCtrlData.codes;
            $scope.operationMode = pieceManageCtrlData.operationMode;
           
		
		
            $scope.save = function(isValid) {
                if(!isValid) {
                    return;
                }
				

                if ($scope.operationMode === 'CREATE') {
				
                    pieceService.save($scope.managedPiece, function() {
						  $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/piece/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
					
					 pieceService.update($scope.managedPiece, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                     
                          $location.path('/piece/home');
                         
                         
                    });
                }
            };
			  

        }
		])
	.controller('PieceInformationManageCtrl', ['$scope', '$rootScope', '$translate', 'pieceService', 'pieceInformationManageCtrlData', '$location',
        function($scope, $rootScope, $translate, pieceService, pieceInformationManageCtrlData,  $location) {

		
            $scope.piece = pieceInformationManageCtrlData.piece;
             if (pieceInformationManageCtrlData.pieceInformation) {
                $scope.managedPieceInformation = {
                    videoLink: pieceInformationManageCtrlData.pieceInformation.videoLink
					/* ,
                    description: angular.fromJson(pieceInformationManageCtrlData.pieceInformation.description) */
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
                $scope.pieceInformation = {
                    videoLink: $scope.managedPieceInformation.videoLink
                };
                if ($scope.managedPieceInformation.image && $scope.managedPieceInformation.image.filesize > 0) {
                    $scope.pieceInformation.image = {
                        name: $scope.managedPieceInformation.image.filename,
                        mimeType: $scope.managedPieceInformation.image.filetype,
                        fileSize: $scope.managedPieceInformation.image.filesize,
                        contentBase64: $scope.managedPieceInformation.image.base64
                    };
                }
                /* $scope.pieceInformation.description = angular.toJson($scope.managedPieceInformation.description); */
                $scope.pieceInformation.pieceId = $scope.piece.id;

                pieceService.savePieceInformation($scope.pieceInformation, function() {
                    $location.path('/piece/home');
                });
            };
        }
    ])
    .controller('PieceInformationView1Ctrl', ['$scope',  '$sce', '$rootScope', '$translate',  'pieceInformationView1CtrlData', 'pieceManageCtrlData', 
        function($scope, $sce, $rootScope, $translate,   pieceInformationView1CtrlData, pieceManageCtrlData) {
        
		
		
		
			$scope.piece = pieceManageCtrlData.piece;
			
			$scope.piece.id = pieceManageCtrlData.piece.id;
				
			
			$scope.files=  pieceInformationView1CtrlData.files.content; 
			
			
  
	
			
			$scope.managedPiece = pieceManageCtrlData.piece;		
			
	
			
            $scope.pieceInformation = pieceInformationView1CtrlData.pieceInformation;
            
			
            $scope.getVideoLink = function() {
                if ($scope.pieceInformation.videoLink.match(/https?:\/\/vimeo\.com\//g)) {
                    $scope.pieceInformation.videoLink = $scope.pieceInformation.videoLink.replace('vimeo.com', 'player.vimeo.com/video');
                }
                return $sce.trustAsResourceUrl($scope.pieceInformation.videoLink + '?title=0&byline=0&portrait=0');
            };

           
        }  
    ])
	.controller('PieceInformationViewCtrl', ['$scope',  '$sce', '$rootScope', '$translate',  'pieceInformationViewCtrlData',    
        function($scope, $sce, $rootScope, $translate,   pieceInformationViewCtrlData) {
        
			
          $scope.piece = pieceInformationViewCtrlData.piece;
			
            $scope.pieceInformation = pieceInformationViewCtrlData.pieceInformation;
            
			
            $scope.getVideoLink = function() {
                if ($scope.pieceInformation.videoLink.match(/https?:\/\/vimeo\.com\//g)) {
                    $scope.pieceInformation.videoLink = $scope.pieceInformation.videoLink.replace('vimeo.com', 'player.vimeo.com/video');
                }
                return $sce.trustAsResourceUrl($scope.pieceInformation.videoLink + '?title=0&byline=0&portrait=0');
            };

           
        }
    ])	
	
	.controller('PieceFileCtrl', ['$scope', '$rootScope', '$location', 'pieceManageCtrlData', 'filePieceManageCtrlData',
        function($scope, $rootScope, $location ,pieceManageCtrlData, filePieceManageCtrlData) {
            $scope.piece = pieceManageCtrlData.piece;
            $scope.searchResult = filePieceManageCtrlData.files;
        }
    ])
  .controller('FilePieceManageCtrl', ['$scope', '$rootScope', '$location', '$route', 'pieceManageCtrlData', 'filePieceManageCtrlData', 'pieceFileService',
        function($scope, $rootScope, $location, $route, pieceManageCtrlData, filePieceManageCtrlData, pieceFileService) {

            $scope.piece = pieceManageCtrlData.piece;
            $scope.operationMode = filePieceManageCtrlData.operationMode;
            $scope.managedFile = filePieceManageCtrlData.file;

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
                    pieceFileService.save({ pieceId: $route.current.params.pieceId }, $scope.managedFile, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/piece/' + $scope.piece.id +'/documentation/home');
                    });
                } else if ($scope.operationMode === 'EDIT') {
                    pieceFileService.update($scope.managedFile, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/piece/' + $scope.piece.id +'/documentation/home');
                    });
                }
            
            };
        }
    ])
    .controller('PieceFileViewCtrl', ['$scope', '$rootScope', '$location', '$route', 'filePieceManageCtrlData', 
    function($scope, $rootScope, $location, $route, filePieceManageCtrlData) {
        $scope.operationMode = filePieceManageCtrlData.operationMode;
        $scope.managedFile = filePieceManageCtrlData.file;
        $scope.pieceId = $route.current.params.pieceId;

        $scope.download = function() {
            window.open($rootScope.apiUrl + '/piece/' + $route.current.params.pieceId + '/documentation/' + $route.current.params.id + '/download', '_blank', '');
        };
		
    }]) 
	
	
	
	;
