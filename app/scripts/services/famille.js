'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.familleService
 * @description
 * # familleService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('familleService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/famille/:id', {
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
                        familleId: '@id'
                    }
                },
               

			

			
              
				
            });
        }
    ]);
