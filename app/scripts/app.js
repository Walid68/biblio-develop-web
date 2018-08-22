'use strict';

/**
 * @ngdoc overview
 * @name biblioWebApp
 * @description
 * # biblioWebApp
 *
 * Main module of the application.
 */
angular
    .module('biblioWebApp', [
      	'bd.sockjs',
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'pascalprecht.translate',
        'base64',
        'angular-loading-bar',
        'ngConfig',
		'ngUtilities',
        'ngToast',
        'ui.bootstrap',
        'ui.calendar',
        'naif.base64',
        'bootstrapLightbox',
        'chart.js',
        'ui.select',
        'countrySelect'
    ])
    .config(['$routeProvider', '$httpProvider', '$translateProvider', 'ngToastProvider', 'datepickerConfig', 'datepickerPopupConfig', 'timepickerConfig', 
             function($routeProvider, $httpProvider,  $translateProvider, ngToastProvider, datepickerConfig, datepickerPopupConfig, timepickerConfig) {

          var checkRole = function(roles) {
            return ['$q', 'securityService', function ($q, securityService) {
                var defer = $q.defer();
                securityService.getConnectedUser(function(data) {
                    var found = false;
                    if(data.loggedIn) {
                        angular.forEach(data.authorities, function(oAuthority) {
                            if(roles.indexOf(oAuthority.authority) >= 0) {
                                found = true;
                            }
                        });
                    }
                    if(found) {
                        defer.resolve();
                    } else {
                        defer.reject({invalidRights: true});
                    }
                }, function() {
                    defer.reject({invalidRights: true});
                });
                return defer.promise;
            }];
        };

        $routeProvider.whenHasAny = function(roles, path, route) {
            route.resolve = route.resolve || {};
            var rolesToCheck = angular.isArray(roles) ? roles : [roles];
            route.resolve.hasRight = checkRole(rolesToCheck);
            return $routeProvider.when(path, route);
        };

        $routeProvider
            .when('/security/signIn', {
                templateUrl: 'views/security/signIn.html',
                controller: 'SignInCtrl'
            })
			.when('/home', {
                templateUrl: 'views/home.html',
				controller: 'CategorieCtrl',
                resolve: {
                	categorieCtrlData: ['CategorieCtrlData', function(CategorieCtrlData) {
                        return CategorieCtrlData.get();
                    }]
                }
					
				
			
            })   
	  	
            .whenHasAny(['SUPERADMIN', 'ADMINISTRATEUR'], '/user/:role/home', {
                templateUrl: 'views/user/home.html',
                controller: 'UserCtrl',
                resolve: {
                    userCtrlData: ['UserCtrlData', '$route', function(UserCtrlData, $route) {
                        var role = $route.current.params.role.toUpperCase();
                        return UserCtrlData.get(role);
                    }],
                    role: ['$route', function($route) {
                        return $route.current.params.role.toUpperCase();
                    }]
                }
            })
			.whenHasAny(['SUPERADMIN', 'ADMINISTRATEUR'], '/user/:role/create', {
                templateUrl: 'views/user/manage.html',
                controller: 'UserManageCtrl',
                resolve: {
                    userManageCtrlData: ['$route', function($route) {
                        return {
                            user: {
                                enabled: true,
                                role: $route.current.params.role.toUpperCase()
                            },
                            operationMode: 'CREATE'
                        };
                    }],
                    role: ['$route', function($route) {
                        return $route.current.params.role.toUpperCase();
                    }]
                }
            })
	        .whenHasAny(['SUPERADMIN','ADMINISTRATEUR'], '/user/:role/edit/:id', {
                templateUrl: 'views/user/manage.html',
                controller: 'UserManageCtrl',
                resolve: {
                    userManageCtrlData: ['UserManageCtrlData','$route', function(UserManageCtrlData, $route) {
                        return UserManageCtrlData.get($route.current.params.id);
                    }],
                    role: ['$route', function($route) {
                        return $route.current.params.role.toUpperCase();
                    }]
                }
            })
			
		.when('/famille/home', {
                templateUrl: 'views/famille/home.html',
                controller: 'FamilleCtrl',
                resolve: {
                	familleCtrlData: ['FamilleCtrlData', function(FamilleCtrlData) {
                        return FamilleCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['SUPERADMIN','ADMINISTRATEUR'], '/famille/create', {
              templateUrl: 'views/famille/manage.html',
				controller: 'FamilleManageCtrl',
                resolve: {
                	familleManageCtrlData: ['FamilleManageCtrlData',  function(FamilleManageCtrlData) {
                        return FamilleManageCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/famille/edit/:id', {
                templateUrl: 'views/famille/manage.html',
                controller: 'FamilleManageCtrl',  
                resolve: {
                	familleManageCtrlData: ['FamilleManageCtrlData', '$route', function(FamilleManageCtrlData, $route) {
                        return FamilleManageCtrlData.get($route.current.params.id);
                    }]
                }
            })
				.when( '/objet/home', {
                templateUrl: 'views/objet/home.html',
                controller: 'ObjetCtrl',
                resolve: {
                	objetCtrlData: ['ObjetCtrlData', function(ObjetCtrlData) {
                        return ObjetCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['SUPERADMIN','ADMINISTRATEUR'], '/objet/create', {
                templateUrl: 'views/objet/manage.html',
                controller: 'ObjetManageCtrl',
                resolve: {
                	objetManageCtrlData: ['ObjetManageCtrlData', function(ObjetManageCtrlData) {
                        return ObjetManageCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/objet/edit/:id', {
                templateUrl: 'views/objet/manage.html',
                controller: 'ObjetManageCtrl',
                resolve: {
                	objetManageCtrlData: ['ObjetManageCtrlData', '$route', function(ObjetManageCtrlData, $route) {
                        return ObjetManageCtrlData.get($route.current.params.id);
                    }]
                }
            })
				.when( '/piece/home', {
                templateUrl: 'views/piece/home.html',
                controller: 'PieceCtrl',
                resolve: {
                	pieceCtrlData: ['PieceCtrlData', function(PieceCtrlData) {
                        return PieceCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['SUPERADMIN','ADMINISTRATEUR'], '/piece/create', {
                templateUrl: 'views/piece/manage.html',
                controller: 'PieceManageCtrl',
                resolve: {
                	pieceManageCtrlData: ['PieceManageCtrlData', function(PieceManageCtrlData) {
                        return PieceManageCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/piece/edit/:id', {
                templateUrl: 'views/piece/manage.html',
                controller: 'PieceManageCtrl',
                resolve: {
                	pieceManageCtrlData: ['PieceManageCtrlData', '$route', function(PieceManageCtrlData, $route) {
                        return PieceManageCtrlData.get($route.current.params.id);
                    }]
                }
            })
			  .when('/piece/view/:pieceId', {
                templateUrl: 'views/piece/view.html',
				controller: 'PieceManageCtrl',
            	//controller:'PieceInformationViewCtrl',
				
                resolve: {
					pieceManageCtrlData: ['PieceManageCtrlData',  '$route', function(PieceManageCtrlData, $route) {
                        return PieceManageCtrlData.get($route.current.params.pieceId);
                    }],
					pieceInformationViewCtrlData: ['PieceInformationViewCtrlData',  '$route', function(PieceInformationViewCtrlData, $route) {
                        return PieceInformationViewCtrlData.get($route.current.params.pieceId);
                    }]
								
                       
                }  
            })
            .when( '/categorie/home', {
                templateUrl: 'views/categorie/home.html',
                controller: 'CategorieCtrl',
                resolve: {
                	categorieCtrlData: ['CategorieCtrlData', function(CategorieCtrlData) {
                        return CategorieCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['SUPERADMIN','ADMINISTRATEUR'], '/categorie/create', {
                templateUrl: 'views/categorie/manage.html',
                controller: 'CategorieManageCtrl',
                resolve: {
                	categorieManageCtrlData: ['CategorieManageCtrlData', function(CategorieManageCtrlData) {
                        return CategorieManageCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/categorie/edit/:id', {
                templateUrl: 'views/categorie/manage.html',
                controller: 'CategorieManageCtrl',
                resolve: {
                	categorieManageCtrlData: ['CategorieManageCtrlData', '$route', function(CategorieManageCtrlData, $route) {
                        return CategorieManageCtrlData.get($route.current.params.id);
                    }]
                }
            })
			 .when('/categorieToProduit', {
                templateUrl: 'views/categorieToProduit/home.html',
                controller: 'CategorieToProduitCtrl',
                resolve: {
					
					categorieToProduitCtrlData: ['CategorieToProduitCtrlData', function(CategorieToProduitCtrlData){
						console.log ('eyooooooooo0000000000000');
                        return CategorieToProduitCtrlData.get();
                    }]
                } 
            })
			 .when('/categorieToProduit/:categorieId/concerned', {
                templateUrl: 'views/categorieToProduit/home.html',
                controller: 'CategorieToProduitCtrl',
                resolve: {
					
					categorieToProduitCtrlData: ['CategorieToProduitCtrlData', '$route', function(CategorieToProduitCtrlData, $route){
						
                        return CategorieToProduitCtrlData.get($route.current.params.categorieId);
                    }]
					
                } 
            })
			 .when( '/produit/home', {
                templateUrl: 'views/produit/home.html',
                controller: 'ProduitCtrl',
                resolve: {
                	produitCtrlData: ['ProduitCtrlData', function(ProduitCtrlData) {
						
                        return ProduitCtrlData.get();
                    }]
                }
            })
		 	 
            .whenHasAny(['SUPERADMIN','ADMINISTRATEUR'], '/produit/create', {
                templateUrl: 'views/produit/manage.html',
                controller: 'ProduitManageCtrl',
                resolve: {
                	produitManageCtrlData: ['ProduitManageCtrlData', function(ProduitManageCtrlData) {
                        return ProduitManageCtrlData.get();
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/produit/edit/:id', {
                templateUrl: 'views/produit/manage.html',
                controller: 'ProduitManageCtrl',
                resolve: {
                	produitManageCtrlData: ['ProduitManageCtrlData', '$route', function(ProduitManageCtrlData, $route) {
                        return ProduitManageCtrlData.get($route.current.params.id);
                    }]
                }
            })
		 	   .when('/produit/view/:produitId', {
                templateUrl: 'views/produit/view.html',
				controller: 'CategorieCtrl',
            	//controller: 'ProduitManageCtrl',
				//controller:'ProduitInformationView1Ctrl',
				
                resolve: {
					produitManageCtrlData: ['ProduitManageCtrlData',  '$route', function(ProduitManageCtrlData, $route) {
                        return ProduitManageCtrlData.get($route.current.params.produitId);
                    }],
					produitInformationView1CtrlData: ['ProduitInformationView1CtrlData',  '$route', function(ProduitInformationView1CtrlData, $route) {
                        return ProduitInformationView1CtrlData.get($route.current.params.produitId);
                    }],
                    fileManageCtrlData: ['ProduitFileManageCtrlData', '$route', function(ProduitFileManageCtrlData, $route) {
                        return ProduitFileManageCtrlData.get($route.current.params.produitId);
                    }],
					categorieCtrlData: ['CategorieCtrlData', function(CategorieCtrlData) {
                        return CategorieCtrlData.get();
                    }]
								
                       
                }  
            })  
			  .when('/piece/view/:pieceId', {
                templateUrl: 'views/piece/view.html',
				//controller: 'FamilleCtrl',
            	controller: 'PieceManageCtrl',
				//controller:	'PieceInformationView1Ctrl',
				
                resolve: {
						
					pieceManageCtrlData: ['PieceManageCtrlData',  '$route', function(PieceManageCtrlData, $route) {
					
                        return PieceManageCtrlData.get($route.current.params.pieceId);
                    }],
					pieceInformationView1CtrlData: ['PieceInformationView1CtrlData',  '$route', function(PieceInformationView1CtrlData, $route) {
                        return PieceInformationView1CtrlData.get($route.current.params.pieceId);
                    }],
                    filePieceManageCtrlData: ['FilePieceManageCtrlData', '$route', function(FilePieceManageCtrlData, $route) {
                        return FilePieceManageCtrlData.get($route.current.params.pieceId);
                    }] 
					/* ,
					familleCtrlData: ['FamilleCtrlData', function(FamilleCtrlData) {
                        return FamilleCtrlData.get();
                    }]  */
								
                       
                }  
            })
		
			.when('/produit/:produitId/information/manage', {
                templateUrl: 'views/produit/information/manage.html', 
                controller: 'ProduitInformationManageCtrl',
                resolve: {
					
                    produitInformationManageCtrlData: ['ProduitInformationManageCtrlData', '$route', function(ProduitInformationManageCtrlData, $route) {
						
                        return ProduitInformationManageCtrlData.get($route.current.params.produitId);
                    }]
                }
            })
            .when( '/produit/:produitId/information/view', {
                templateUrl: 'views/produit/information/view.html',
                controller: 'ProduitInformationViewCtrl',
                resolve: {
                    produitInformationViewCtrlData: ['ProduitInformationViewCtrlData', '$route', function(ProduitInformationViewCtrlData, $route) {
                        return ProduitInformationViewCtrlData.get($route.current.params.produitId);
                    }]
                    
                }
                
            })
			
			.when('/piece/:pieceId/information/manage', {
                templateUrl: 'views/piece/information/manage.html', 
                controller: 'PieceInformationManageCtrl',
                resolve: {
					
                    pieceInformationManageCtrlData: ['PieceInformationManageCtrlData', '$route', function(PieceInformationManageCtrlData, $route) {
						
                        return PieceInformationManageCtrlData.get($route.current.params.pieceId);
                    }]
                }
            })
            .when( '/piece/:pieceId/information/view', {
                templateUrl: 'views/piece/information/view.html',
                controller: 'PieceInformationViewCtrl',
                resolve: {
                    pieceInformationViewCtrlData: ['PieceInformationViewCtrlData', '$route', function(PieceInformationViewCtrlData, $route) {
                        return PieceInformationViewCtrlData.get($route.current.params.pieceId);
                    }]
                    
                }
                
            })
			/* gjhgjd */
			
			.when('/produit/:produitId/documentation/home', {
                templateUrl: 'views/produit/documentation/home.html',
                
				controller: 'ProduitFileCtrl',
				
                resolve: {
                    produitManageCtrlData: ['ProduitManageCtrlData', '$route', function(ProduitManageCtrlData, $route) {
                        return ProduitManageCtrlData.get($route.current.params.produitId);
                    }],
                    fileManageCtrlData: ['ProduitFileManageCtrlData', '$route', function(ProduitFileManageCtrlData, $route) {
                        return ProduitFileManageCtrlData.get($route.current.params.produitId);
                    }]
                }
            })
		
		.when('/piece/:pieceId/documentation/home', {
                templateUrl: 'views/piece/documentation/home.html',
                
				controller: 'PieceFileCtrl',
				
                resolve: {
                    pieceManageCtrlData: ['PieceManageCtrlData', '$route', function(PieceManageCtrlData, $route) {
                        return PieceManageCtrlData.get($route.current.params.pieceId);
                    }],
                    filePieceManageCtrlData: ['FilePieceManageCtrlData', '$route', function(FilePieceManageCtrlData, $route) {
                        return FilePieceManageCtrlData.get($route.current.params.pieceId);
                    }]
                }
            })
			.whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/produit/:produitId/documentation/create', {
                templateUrl: 'views/produit/documentation/manage.html',
                controller: 'ProduitFileManageCtrl',
				
                resolve: {
                    produitManageCtrlData: ['ProduitManageCtrlData', '$route', function(ProduitManageCtrlData, $route) {
                        return ProduitManageCtrlData.get($route.current.params.produitId);
                    }],
                    fileManageCtrlData: [function() {
                        return {
                            file: {},
                            operationMode: 'CREATE'
                        };
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/produit/:produitId/documentation/:id/manage', {
                templateUrl: 'views/produit/documentation/manage.html',
                controller: 'ProduitFileManageCtrl',
                resolve: {
                    fileManageCtrlData: ['ProduitFileManageCtrlData', '$route', function(ProduitFileManageCtrlData, $route) {
                        return ProduitFileManageCtrlData.getOne($route.current.params.produitId, $route.current.params.id).then(function(data) {
                            return {
                                file: data,
                                operationMode: 'EDIT'
                            };
                        });
                    }]
                }
            })
            .when('/produit/:produitId/documentation/:id/view', {
                templateUrl: 'views/produit/documentation/view.html',
                controller: 'ProduitFileViewCtrl',
                resolve: {
                    fileManageCtrlData: ['ProduitFileManageCtrlData', '$route', function(ProduitFileManageCtrlData, $route) {
                        return ProduitFileManageCtrlData.getOne($route.current.params.produitId, $route.current.params.id).then(function(data) {
                            return {
                                file: data,
                                operationMode: 'VIEW'
                            };
                        });
                    }]
                }
            })
			
			.whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/piece/:pieceId/documentation/create', {
                templateUrl: 'views/piece/documentation/manage.html',
                controller: 'FilePieceManageCtrl',
				
                resolve: {
                    pieceManageCtrlData: ['PieceManageCtrlData', '$route', function(PieceManageCtrlData, $route) {
                        return PieceManageCtrlData.get($route.current.params.pieceId);
                    }],
                    filePieceManageCtrlData: [function() {
                        return {
                            file: {},
                            operationMode: 'CREATE'
                        };
                    }]
                }
            })
            .whenHasAny(['ADMINISTRATEUR', 'SUPERADMIN'], '/piece/:pieceId/documentation/:id/manage', {
                templateUrl: 'views/piece/documentation/manage.html',
                controller: 'PieceFileManageCtrl',
                resolve: {
                    filePieceManageCtrlData: ['FilePieceManageCtrlData', '$route', function(FilePieceManageCtrlData, $route) {
                        return FilePieceManageCtrlData.getOne($route.current.params.pieceId, $route.current.params.id).then(function(data) {
                            return {
                                file: data,
                                operationMode: 'EDIT'
                            };
                        });
                    }]
                }
            })
            .when('/piece/:pieceId/documentation/:id/view', {
                templateUrl: 'views/piece/documentation/view.html',
                controller: 'PieceFileViewCtrl',
                resolve: {
                    filePieceManageCtrlData: ['FilePieceManageCtrlData', '$route', function(FilePieceManageCtrlData, $route) {
                        return FilePieceManageCtrlData.getOne($route.current.params.pieceId, $route.current.params.id).then(function(data) {
                            return {
                                file: data,
                                operationMode: 'VIEW'
                            };
                        });
                    }]
                }
            })
			         
		.when('/successPass', {
                templateUrl: 'views/message/successPass.html',
            })
			.when('/forget', {
            templateUrl: 'views/user/mdp.html'
			
            })
	
			.otherwise({
                redirectTo: '/security/signIn'
            });


        // Default request handler.
        $httpProvider.interceptors.push(['$q', '$location', '$rootScope', '$base64', function($q, $location, $rootScope, $base64) {
            return {
                'request': function(config) {
                    if (config.url.match(/signIn$/g)) {
                        config.headers.Authorization = 'Basic ' + $base64.encode(config.data.userName + ':' + config.data.password);
                        config.data = {};
                    }
                    return config;
                },
                'responseError': function(rejection) {
                    if (rejection.status === 0) {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.CONNECTION_REFUSED');
                    } else if (rejection.status === 401 && $location.path() === '/security/signIn') {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.BAD_CREDENTIALS');
                    } else if (rejection.status === 401 && $location.path() !== '/security/signIn') {
                        $location.path('/security/signIn');
                    } else if (rejection.status === 403) {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.ACCESS_FORBIDDEN');
                    } else if (rejection.status === 406) {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.UNACCEPTABLE');
                    } else if (rejection.status === 409) {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.ALREADY_EXISTS');
                    } else if (rejection.status === 500) {
                        $rootScope.showErrorMessage('MESSAGE.ERROR.INTERNAL_SERVER_ERROR');
                    }else if(rejection.status === 400){
						
						var json = JSON.parse(rejection.data.messageProperties);
                          $rootScope.showErrorMessage('MESSAGE.ERROR.' + rejection.data.messageKey, json);
                    	/* $rootScope.showErrorMessage('MESSAGE.ERROR.' + rejection.data.messageKey, JSON.parse(rejection.data.messageProperties)); */
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

        // CORS support.
        $httpProvider.defaults.withCredentials = true;

        // Translation default language.
        $translateProvider.preferredLanguage('fr');
        $translateProvider.fallbackLanguage('fr');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.useStaticFilesLoader({
            prefix: 'scripts/translations/',
            suffix: '.json'
        });
        $translateProvider.useLocalStorage();

        // Toast
        ngToastProvider.configure({
            animation: 'slide',
            horizontalPosition:	'left',
            verticalPosition:	'bottom'
        });

        //DatePicker
    	datepickerConfig.startingDay = 1;
    	datepickerPopupConfig.clearText = 'Effacer';
    	datepickerPopupConfig.currentText = 'Aujourd\'hui';
    	datepickerPopupConfig.closeText = 'Fermer';

    	//TimePicker
    	timepickerConfig.mousewheel  = false;
    	timepickerConfig.showMeridian  = false;
    }])
    .run(['$rootScope', '$location', '$translate', '$window', 'securityService', 'ngToast', 'version', 'apiUrl', 'notificationBroadcast', 'bookingBroadcast', 'Lightbox',
        function($rootScope, $location, $translate, $window, securityService, ngToast, version,  apiUrl, notificationBroadcast, bookingBroadcast, Lightbox) {
            $rootScope.applicationVersion = version;

            $rootScope.apiUrl = apiUrl;

            $rootScope.goTo = function(page, arg) {
                if (arg) {
                    $location.path(page + '/' + arg);
                } else {
                    $location.path(page);
                }
            };

            $rootScope.endsWith = function(str, suffix) {
                return str.indexOf(suffix, this.length - suffix.length) !== -1;
            };

            $rootScope.startsWith = function(str, prefix) {
                return str.indexOf(prefix) === 0;
            };

            $rootScope.processLink = function(link) {
                if($rootScope.startsWith(link, 'http')) {
                    return link;
                } else {
                    return 'http://' + link;
                }
            };

            $rootScope.goBack = function() {
                $window.history.go(-1);
            };

            $rootScope.goBack2 = function() {
                $window.history.go(-2);
            };

            $rootScope.hasAnyRole = function() {
                var rolesToCheck = Array.prototype.slice.call(arguments);
                if(!$rootScope.session || !$rootScope.session.loggedIn) {
                    return false;
                }
                var found = false;
                angular.forEach($rootScope.session.authorities, function(oAuthority) {
                    if(rolesToCheck.indexOf(oAuthority.authority) >= 0) {
                        found = true;
                    }
                });
                return found;
            };

            $rootScope.showSuccessMessage = function(mode) {
                $translate(['MESSAGE.SUCCESS.' + mode]).then(function(translations) {
                    ngToast.create({
                        className: 'success',
                        content: translations['MESSAGE.SUCCESS.' + mode]
                    });
                });
            };

            $rootScope.showErrorMessage = function(messageKey, args) {
                $translate(['MESSAGE.ERROR.TITLE', messageKey, 'COMMON.CLOSE'], args).then(function(translations) {
                    bootbox.dialog({
                        title: translations['MESSAGE.ERROR.TITLE'],
                        className: 'errorDialog',
                        message: translations[messageKey],
                        buttons: {
                            danger: {
                                label: translations['COMMON.CLOSE'],
                                className: 'btn-danger'
                            }
                        }
                    });
                });
            };

            $rootScope.showInfoMessage = function(messageKey) {
            	$translate(['MESSAGE.INFO.TITLE', messageKey, 'COMMON.CLOSE']).then(function(translations) {
            		bootbox.dialog({
            			title: translations['MESSAGE.INFO.TITLE'],
            			className: 'infoDialog',
            			message: translations[messageKey],
            			buttons: {
            				danger: {
            					label: translations['COMMON.CLOSE'],
            					className: 'btn-default'
            				}
            			}
            		});
            	});
            };

            $rootScope.showConfirmationMessage = function(messageKey, args, fnCallback) {
                $translate(['MESSAGE.CONFIRMATION.TITLE', messageKey, 'COMMON.CANCEL', 'COMMON.CONFIRM'], args).then(function(translations) {
                    bootbox.dialog({
                        message: translations[messageKey],
                        title: translations['MESSAGE.CONFIRMATION.TITLE'],
                        className: 'confirmDialog',
                        buttons: {
                        	confirm: {
                                label: translations['COMMON.CONFIRM'],
                                className: 'btn-danger',
                                callback: fnCallback
                            },
                            cancel: {
                                label: translations['COMMON.CANCEL'],
                                className: 'btn-default'
                            }
                        }
                    });
                });
            };

           $rootScope.$on('$routeChangeStart', function() {
                securityService.getConnectedUser(function(connectedUser) {
                    $rootScope.session = connectedUser;
                     //istanbul ignore next
                     if ($rootScope.session !== null && !$rootScope.session.loggedIn && $location.path().substr(0, 12) !== '/departement' && $location.path().substr(0, 9) !== '/inscription' 
					 ) {
                        $location.path('/security/signIn');
                    }
					
                });
            }); 
	
            $rootScope.$on('$routeChangeSuccess', function() {
            	securityService.getConnectedUser(function(connectedUser) {
            		if(connectedUser.loggedIn && $location.path() === '/security/signIn'){
            			$location.path('/home');
            		}
            	});
                $window.scrollTo(0, 0);
            });



            //LightBox
            $rootScope.openLightboxModal = function (url) {
            	var images = [{
                              'url': url
                             }];

        		Lightbox.openModal(images, 0);
            };
			
          /*   $rootScope.showPdf = function(url) {
                $rootScope.modalPdf = $modal.open({
                    animation: true,
                    templateUrl: 'views/shared/pdf.html',
                    controller: 'ModalPdfCtrl',
                    size: 'lg',
                    resolve: {
                        url: () => url
                    }
                });
            }; */
            /* $rootScope.closePdf = function() {
                $rootScope.modalPdf.close();
            };

            $rootScope.showPhoto = function(photo) {
                $rootScope.openLightboxModal(`data:${photo.filetype};base64,${photo.base64}`);
            }; */
        }
    ]);
