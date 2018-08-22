'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.categorieService
 * @description
 * # produitTopieceService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('produitToPieceService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/produitToPiece/:id', {
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
                        categorieId: '@id'
                    }
                },
                getPiece: {
                	method: 'GET',
                    params: {
                        produitToPieceId: '@id'
                    }
                },
				
			
                getPiecesByProduitToPiece: {
                	method: 'GET',
                	url: apiUrl + '/piece/produitToPieceId/:produitToPieceId',
                    params: {
                        produitToPieceId: '@produitToPieceId'
                    }
                },

			
                getProduitsByPiece: {
                	method: 'GET',
                	url: apiUrl + '/piece/:pieceId/produit/all',
                    params: {
                        pieceId: '@pieceId'
                    }
                }
				
            });
        }
    ]);
