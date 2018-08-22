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
					
                    isArray: false,
					 params: {
                        size: 5000
                    }
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
                }
				
				
            });
        }
    ])

;
