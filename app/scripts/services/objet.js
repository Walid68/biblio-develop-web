'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.objetService
 * @description
 * # siteService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('objetService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/objet/:id', {
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
                        objetId: '@id'
                    }
                },
                getCrategorie: {
                	method: 'GET',
                    params: {
                        objetId: '@id'
                    }
                },

			
                getProduitsByObjet: {
                	method: 'GET',
                	url: apiUrl + '/objet/:objetId/produit',
                    params: {
                        objetId: '@objetId'
                    }
                },			
			
                getObjetsByObjetToProduit: {
                	method: 'GET',
                	url: apiUrl + '/objet/objetToProduitId/:objetToProduitId',
                    params: {
                        objetToProduitId: '@objetToProduitId'
                    }
                }
				
            });
        }
    ]);
