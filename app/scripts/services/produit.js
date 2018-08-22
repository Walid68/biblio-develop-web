'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.produitService
 * @description
 * # produitService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('produitService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/produit/:id', {
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
                        produitId: '@id'
                    }
                },
                getProduit: {
                	method: 'GET',
                    params: {
                        produitId: '@id'
                    }
                },
				
                searchStr:{
                    method:'GET',
                    url: apiUrl+'/produit',
                    isArray: false,
                    params:{
                        search:'@search'
                    }
                } ,
				  getProduitInformation: {
                	method: 'GET',
                	url: apiUrl + '/produit/:produitId/information',
                	isArray: false,
                    params: {
                        produitId: '@produitId'
                    }
                },
				  saveProduitInformation: {
                	method: 'POST',
                	url: apiUrl + '/produit/:produitId/information',
                    params: {
                        produitId: '@produitId'
                    }
                },
				  getProduitDocument: {
                	method: 'GET',
                	url: apiUrl + '/produit/:produitId/documentation',
                	isArray: false,
                    params: {
                        produitId: '@produitId'
                    }
                },
					
				
            });
        }
    ])
.factory('produitFileService', ['$resource', 'apiUrl',
    function($resource, apiUrl) {
        return $resource(apiUrl + '/produit/:produitId/documentation/:id', {
            produitId: '@produitId',
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
                url: apiUrl + '/produit/:produitId/documentation/:id/download'
            }
        });
    }
])
;
