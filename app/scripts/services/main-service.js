'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.produitService
 * @description
 * # produitService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('autoComService', ['$resource', 'apiUrl',
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
				
                /* searchStr:{
                    method:'GET',
                    url: apiUrl+'/produit',
                    isArray: false,
                    params:{
                        search:'@search'
                    }
                }, */
				
				
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
