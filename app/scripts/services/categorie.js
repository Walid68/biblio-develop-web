'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.categorieService
 * @description
 * # siteService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('categorieService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/categorie/:id', {
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
                getCrategorie: {
                	method: 'GET',
                    params: {
                        categorieId: '@id'
                    }
                },

			
                getProduitsByCategorie: {
					
                	method: 'GET',
                	url: apiUrl + '/categorieToProduit/:categorieId/produit',
                    params: {

                        categorieId: '@categorieId'
                    }
                } 
				

			
              /*   getCategoriesByCategorieToProduit: {
                	method: 'GET',
                	url: apiUrl + '/categorie/categorieToProduitId/:categorieToProduitId',
                    params: {
                        categorieToProduitId: '@categorieToProduitId'
                    }
                } */
				
            });
        }
    ]);
