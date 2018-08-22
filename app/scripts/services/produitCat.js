'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.produitCatService
 * @description
 * # produitCatService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('parentService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/categorie/:categorieId/produitCat/:id', {
                id: '@id',
				categorieId : '@categorieId'
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
                }             


                       });
        }
    ]);
