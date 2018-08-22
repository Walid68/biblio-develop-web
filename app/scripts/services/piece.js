'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.pieceService
 * @description
 * # siteService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('pieceService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/piece/:id', {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },

                save: {
                    method: 'POST',
                    params: {
                        id: null
                    }
                },

                update: {
                    method: 'PUT'
                },
                remove: {
                	method: 'DELETE',
                    params: {
                        pieceId: '@id'
                    }
                },
                getCrategorie: {
                	method: 'GET',
                    params: {
                        pieceId: '@id'
                    }
                },

			
                getProduitsByPiece: {
                	method: 'GET',
                	url: apiUrl + '/piece/:pieceId/produit',
                    params: {
                        pieceId: '@pieceId'
                    }
                },
				
				  getPieceInformation: {
                	method: 'GET',
                	url: apiUrl + '/piece/:pieceId/information',
                	isArray: false,
                    params: {
                        pieceId: '@pieceId'
                    }
                },
  savePieceInformation: {
                	method: 'POST',
                	url: apiUrl + '/piece/:pieceId/information',
                    params: {
                        pieceId: '@pieceId'
                    }
                },
			
                getPiecesByProduitToPiece: {
                	method: 'GET',
                	url: apiUrl + '/piece/produitToPieceId/:produitToPieceId',
                    params: {
                        produitToPieceId: '@produitToPieceId'
                    }
                },
				
				  getPieceDocument: {
                	method: 'GET',
                	url: apiUrl + '/piece/:pieceId/documentation',
                	isArray: false,
                    params: {
                        pieceId: '@pieceId'
                    }
                }
				
            });
        }
    ])
	
	.factory('pieceFileService', ['$resource', 'apiUrl',
    function($resource, apiUrl) {
        return $resource(apiUrl + '/piece/:pieceId/documentation/:id', {
            pieceId: '@pieceId',
            id: '@id'
        }, {
            query: {
                isArray: false
            },

            save: {
                method: 'POST',
                params: {
                    id: null
                }
            },

            update: {
                method: 'PUT'
            },

            download: {
                method: 'GET',
                url: apiUrl + '/piece/:pieceId/documentation/:id/download'
            }
        });
    }
])
;
