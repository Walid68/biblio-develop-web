'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.pieceService
 * @description
 * # pieceService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('autoComPieceService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/piece/:id', {
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
                        pieceId: '@id'
                    }
                },
                getPiece: {
                	method: 'GET',
                    params: {
                        pieceId: '@id'
                    }
                }
				/* ,
                searchStr:{
                    method:'GET',
                    url: apiUrl+'/piece',
                    isArray: false,
                    params:{
                        search:'@search'
                    }
                }  */
				
            });
        }
    ])

;
