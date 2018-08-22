'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.CtrlData
 * @description
 * # CtrlData
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('UserCtrlData', ['$q', 'securityService', 'userService', function($q, securityService, userService) {
        return {
            get: function(role) {
                var connectedUser = securityService.getConnectedUser();
                var users = userService.query({
                    page: 0,
                    size: 10,
                    role: role
                });

                return $q.all([connectedUser.$promise, users.$promise]).then(function(results) {
                    return {
                        connectedUser: results[0],
                        users: results[1]
                    };
                });
            }
        };
    }])
    .factory('UserManageCtrlData', ['$q', 'securityService', 'userService', function($q, securityService, userService) {
        return {
            get: function(userId) {
                var user = userService.get({
                    id: userId
                });

                return $q.all([user.$promise]).then(function(results) {
                    return {
                        user: results[0],
                        operationMode: 'EDIT'
                    };
                });
            }
        };
    }])


.factory('ProduitCtrlData', ['$q', 'produitService', function($q, produitService) {
        return {
            get: function() {
                var produits = produitService.query({
                    page: 0,
                    size: 100
                });

                return $q.all([produits.$promise]).then(function(results) {
                    return {
                        produits: results[0]
                    };
                });
            }
        };
    }])
	
	.factory('ProduitInformationManageCtrlData', ['$q', 'produitService', function($q, produitService) {
		return {
			get: function(produitId) {

				var produit = produitService.get({
    				id: produitId
    			});

                var produitInformation = produitService.getProduitInformation({
    				produitId: produitId
    			});

				return $q.all([produit.$promise, produitInformation.$promise]).then(function(results) {
					return {
						produit: results[0],
						produitInformation: results[1]
					};
				});
			}
		};
	}])
		.factory('PieceInformationManageCtrlData', ['$q', 'pieceService', function($q, pieceService) {
		return {
			get: function(pieceId) {

				var piece = pieceService.get({
    				id: pieceId
    			});

                var pieceInformation = pieceService.getPieceInformation({
    				pieceId: pieceId
    			});

				return $q.all([piece.$promise, pieceInformation.$promise]).then(function(results) {
					return {
						piece: results[0],
						pieceInformation: results[1]
					};
				});
			}
		};
	}])
	.factory('ProduitInformationViewCtrlData', ['$q', 'produitService', function($q, produitService) {
		return {
			get: function(produitId) {

				var produit = produitService.get({
    				id: produitId
    			});

                var produitInformation = produitService.getProduitInformation({
    				produitId: produitId
    			});

               

				return $q.all([produit.$promise, produitInformation.$promise]).then(function(results) {
					return {
						produit: results[0],
						produitInformation: results[1]
					};
				});
			}
		};
	}])
	

	.factory('ProduitInformationView1CtrlData', ['$q', 'produitService', 'categorieService', function($q, produitService, categorieService) {
		return {
			get: function(produitId) {

				var produit = produitService.get({
    				id: produitId
    			});

                var produitInformation = produitService.getProduitInformation({
    				produitId: produitId
    			});
				
				var files = produitService.getProduitDocument({
    				produitId: produitId,
					page: 0,
                    size: 20
    			});
				var categoriess = categorieService.query({
    				page: 0,
                    size: 100
    			});
               

				return $q.all([produit.$promise, produitInformation.$promise, files.$promise, categoriess.$promise ]).then(function(results) {
					return {
						produit: results[0],
						produitInformation: results[1],
						files: results[2],
						categoriess : results[3]
					};
				});
			}
		};
	}])
	
	.factory('PieceInformationView1CtrlData', ['$q', 'pieceService',  function($q, pieceService) {
		return {
			get: function(pieceId) {

				var piece = pieceService.get({
    				id: pieceId
    			});
				
                var pieceInformation = pieceService.getPieceInformation({
    				pieceId: pieceId
    			});
				
				var files = pieceService.getPieceDocument({
    				pieceId: pieceId,
					page: 0,
                    size: 20
    			});
				
               

				return $q.all([piece.$promise, pieceInformation.$promise, files.$promise ]).then(function(results) {
					return {
						
						piece: results[0],
						pieceInformation: results[1],
						files: results[2]
					};
				});
			}
		};
	}])
	
	.factory('PieceInformationViewCtrlData', ['$q', 'pieceService',  function($q, pieceService) {
		return {
			get: function(pieceId) {

				var piece = pieceService.get({
    				id: pieceId
    			});

                var pieceInformation = pieceService.getPieceInformation({
    				pieceId: pieceId
    			});
				
				
               

				return $q.all([piece.$promise, pieceInformation.$promise]).then(function(results) {
					return {
						piece: results[0],
						pieceInformation: results[1]
						
					};
				});
			}
		};
	}])
	    .factory('CategorieCtrlData', ['$q', 'categorieService', function($q, categorieService) {
        return {
            get: function() {
				
                var categories = categorieService.query({
                    page: 0,
                    size: 100
                });

                return $q.all([categories.$promise]).then(function(results) {
                    return {
                        categories: results[0]
                    };
                });
            }
        };
    }])
	  .factory('FamilleCtrlData', ['$q', 'familleService', function($q, familleService) {
        return {
            get: function() {
                var familles = familleService.query({
                    page: 0,
                    size: 10
                });

                return $q.all([familles.$promise]).then(function(results) {
                    return {
                        familles: results[0]
                    };
                });
            }
        };
    }])
	.factory('PieceCtrlData', ['$q', 'pieceService', function($q, pieceService) {
        return {
            get: function() {
                var pieces = pieceService.query({
                    page: 0,
                    size: 10
                });

                return $q.all([pieces.$promise]).then(function(results) {
                    return {
                        pieces: results[0]
                    };
                });
            }
        };
    }])
.factory('ObjetCtrlData', ['$q', 'objetService', function($q, objetService) {
        return {
            get: function() {
                var objets = objetService.query({
                    page: 0,
                    size: 10
                });

                return $q.all([objets.$promise]).then(function(results) {
                    return {
                        objets: results[0]
                    };
                });
            }
        };
    }])
		.factory('ProduitCtrlData', ['$q', 'produitService', function($q, produitService) {
        return {
            get: function() {
                var produits = produitService.query({
                    page: 0,
                    size: 10
                });
	
                return $q.all([produits.$promise]).then(function(results) {
                
				   return {
						
                        produits: results[0],
						
                    };
                });
            }
        };
    }])
	  
 	.factory('AutoComCtrlData', ['$q', 'autoComService', function($q, autoComService) {
        return {
            get: function() {
                var produits = autoComService.query({
                    page: 0,
                    size: 150
                });

                return $q.all([produits.$promise]).then(function(results) {
			console.log(produits);                   
				   return {
                        produits: results[0]
                    };
                });
            }
        };
    }]) 
	
		.factory('AutoComPieceCtrlData', ['$q', 'autoComPieceService', function($q, autoComPieceService) {
        return {
            get: function() {
                var pieces = autoComPieceService.query({
                    page: 0,
                    size: 150
                });

                return $q.all([pieces.$promise]).then(function(results) {
			console.log(pieces);                   
				   return {
                        pieces: results[0]
                    };
                });
            }
        };
    }]) 
	
	
	  .factory('ProduitManageCtrlData', ['$q', 'produitService', 'categorieService', 'pieceService','familleService', 
	  function($q, produitService, categorieService, pieceService, familleService) {
        return {
            get: function(produitId) {

            	var categories = categorieService.query({
                    page: 0,
                    size: 1000
                });
				var pieces = pieceService.query({
                    page: 0,
                    size: 1000
                });
				
				var codes = familleService.query({
                    page: 0,
                    size: 100,
                }); 
				
                if(produitId) {
                	var produit = produitService.query({
                        id: produitId
                    });
					
				
                	return $q.all([produit.$promise, categories.$promise, pieces.$promise, codes.$promise]).then(function(results) {
                        return {
                           produit: results[0],
                           categories: results[1],
						   pieces: results[2],
						   codes: results[3],
                           operationMode: 'EDIT'
                        };
                    });
                } else {
                	return $q.all([categories.$promise, pieces.$promise, codes.$promise]).then(function(results) {
                        return {
                            produit: {},
							categories: results[0],
							pieces: results[1],
							codes: results[2],
							
                            operationMode: 'CREATE'
                        };
                    });
                }
				
            }
        };
    }])  
	.factory('ProduitCatCtrlData', ['$q',  'categorieService', 'produitCatService', function($q,  categorieService, produitCatService) {
        return {
            get: function( _categorieId) {

          	var categorie = categorieService.get({
                      id: _categorieId
                  });
                  var produitCats = produitCatService.query({
  					categorieId : _categorieId,
                      page: 0,
                      size: 10


                  });

                  return $q.all([categorie.$promise,  produitCats.$promise]).then(function(results) {

                      return {

  						categorie: results[0],
                          produitCats: results[1]
                      };
                  });
              }
		
	
        };
    }])
.factory('ProduitCatManageCtrlData', ['$q',  'categorieService', 'produitCatService', function($q, categorieService, produitCatService) {
          return {

  			get: function(_categorieId, produitCatId) {
            var categorie;
            var produitCat;
            if (!_categorieId){
                   categorie = produitCatService.getCategorie({id: produitCatId});
            }
            else{
                    categorie = categorieService.get({
                      id: _categorieId
                    });
            }


            if(produitCatId) {
                      if (!_categorieId){
                         produitCat = produitCatService.getProduitCat({id: produitCatId});
                      }
                      else{

                          produitCat = produitCatService.get({
                         	id: produitCatId,
                          categorieId: _categorieId

                      });
                    }
                      return $q.all([categorie.$promise, produitCat.$promise]).then(function(results) {
                          return {
                              categorie: results[0],
                              produitCat: results[1],
                              operationMode: 'EDIT'
                          };
                      });
  				          } else {
                      return $q.all([categorie.$promise]).then(function(results) {
                          return {
                              categorie: results[0],
                              produitCat: {},
                              operationMode: 'CREATE'
                          };
                      });
  				}
              }
          };
      }])
	.factory('CategorieManageCtrlData', ['$q', 'categorieService',  function($q, categorieService) {
        return {
            get: function(categorieId) {

               if(categorieId) {
                	var categorie = categorieService.query({
                        id: categorieId
                    });

                	return $q.all([categorie.$promise ]).then(function(results) {
                        return {
                            categorie: results[0],
                            operationMode: 'EDIT'
                        };
                    });
                } else {
                	return $q.all([]).then(function() {
                        return {
                            categorie: {},
                            operationMode: 'CREATE'
                        };
                    });
                }
				
            }
        };
    }])
.factory('FamilleManageCtrlData', ['$q', 'familleService','objetService',  function($q, familleService, objetService) {
        return {
            get: function(familleId) {
				
				var trigrammeCodes = objetService.query({
                    page: 0,
                    size: 100,
                }); 
				
               if(familleId) {
                	var famille = familleService.query({
                        id: familleId
                    });

                	return $q.all([famille.$promise, trigrammeCodes.$promise]).then(function(results) {
						
                        return {
                            famille: results[0],
							trigrammeCodes: results[1],
                            operationMode: 'EDIT'
                        };
                    });
                } else {
                	return $q.all([trigrammeCodes.$promise]).then(function(results) {

                        return {
                            famille: {},
							trigrammeCodes: results[0],
                            operationMode: 'CREATE'
                        };
                    });
                }
				
            }
        };
    }])
	.factory('PieceManageCtrlData', ['$q', 'pieceService', 'familleService',  function($q, pieceService, familleService) {
        return {
            get: function(pieceId) {

			var codes = familleService.query({
                    page: 0,
                    size: 100,
                }); 
				
               if(pieceId) {
                	var piece = pieceService.query({
                        id: pieceId
                    });

                	return $q.all([piece.$promise, codes.$promise]).then(function(results) {
                        return {
                            piece: results[0],
							codes: results[1],
                            operationMode: 'EDIT'
                        };
                    });
                } else {
                	return $q.all([codes.$promise]).then(function(results) {
                        return {
                            piece: {},
							codes: results[0],
                            operationMode: 'CREATE'
                        };
                    });
                }
				
            }
        };
    }])
	.factory('ObjetManageCtrlData', ['$q', 'objetService',  function($q, objetService) {
        return {
            get: function(objetId) {

               if(objetId) {
                	var objet = objetService.query({
                        id: objetId
                    });

                	return $q.all([objet.$promise ]).then(function(results) {
                        return {
                            objet: results[0],
                            operationMode: 'EDIT'
                        };
                    });
                } else {
                	return $q.all([]).then(function() {
                        return {
                            objet: {},
                            operationMode: 'CREATE'
                        };
                    });
                }
				
            }
        };
    }])

		
/* .factory('CategorieToProduitCtrlData', ['$q', 'categorieToProduitService', function($q, categorieToProduitService) {
        return {
            get: function() {
                var categorieToProduits = categorieToProduitService.query({
                    page: 0,
                    size: 100
                });

                return $q.all([categorieToProduits.$promise]).then(function(results) {
                    return {
                        categorieToProduits: results[0]
                    };
                });
            }
        };
    }]) */
	.factory('CategorieToProduitCtrlData', ['$q', 'categorieToProduitService', function($q, categorieToProduitService) {
        return {
            get: function(_categorieId) {
                var categorieToProduits = categorieToProduitService.getProduitByCategorie({
					categorieId: _categorieId,
                    page: 0,
                    size: 100
                });

                return $q.all([categorieToProduits.$promise]).then(function(results) {
                    return {
                        categorieToProduits: results[0]
                    };
                });
            }
        };
    }])
	
	.factory('ProduitFileManageCtrlData', ['$q', 'produitFileService', function($q, produitFileService) {
        return {
            get: function(produitId) {
                var files = produitFileService.query({
                    produitId: produitId,
                    page: 0,
                    size: 10
                });

                return $q.all([files.$promise]).then(function(results) {
                    return {
                        files: results[0]
                    };
                });
            },

            getOne: function(produitId, id) {
                var file = produitFileService.get({
                    produitId: produitId,
                    id: id
                });

                return $q.all([file.$promise]).then(function(results) {
                    return results[0];
                });
            }
        };
    }])
	.factory('FilePieceManageCtrlData', ['$q', 'pieceFileService', function($q, pieceFileService) {
        return {
            get: function(pieceId) {
                var files = pieceFileService.query({
                    pieceId: pieceId,
                    page: 0,
                    size: 10
                });

                return $q.all([files.$promise]).then(function(results) {
                    return {
                        files: results[0]
                    };
                });
            },

            getOne: function(pieceId, id) {
                var file = pieceFileService.get({
                    pieceId: pieceId,
                    id: id
                });

                return $q.all([file.$promise]).then(function(results) {
                    return results[0];
                });
            }
        };
    }]);
