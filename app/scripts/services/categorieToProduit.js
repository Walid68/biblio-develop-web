'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.categorieToProduitService
 * @description
 * # categorieToProduitService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('categorieToProduitService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/categorieToProduit/:id', {
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
                        categorietoProduitId: '@id'
                    }
                },
                getCategorieToProduit: {
                	method: 'GET',
                    params: {
                        categorieToProduitId: '@id'
                    }
                },
				

				getProduitByCategorie: {
                	method: 'GET',
                	url: apiUrl + '/categorieToProduit/:categorieId/concerned',
                	isArray: false,
                    params: {
                        categorieId: '@categorieId'
                    }
                },
         /*        
                saveProduitInformation: {
                	method: 'POST',
                	url: apiUrl + '/produit/:produitId/information',
                    params: {
                        produitId: '@produitId'
                    }
                }, 
			
               setInformationDone: {
                    method: 'POST',
                	params: {
                        action: 'informationDone'
                    }
                }
*/				
				
            });
        }
    ])

;
