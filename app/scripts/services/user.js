'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.userService
 * @description
 * # userService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('userService', ['$resource', 'apiUrl',
        function($resource, apiUrl) {
            return $resource(apiUrl + '/user/:id', {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
				queryMail: {
					mail : '@mail',
                    isArray: false
                },
                save: {
                    method: 'POST',
                    params: {
                        id: null
                    }
                },

                generateNewPassword: {
                    method: 'POST',
                    params: {
                        action: 'generateNewPassword'
                    }
                },
			/* 	getUserByMail: {
                	method: 'GET',
					url: apiUrl + '/user/forget',
                	params: {
                        mail: null
                    }
                },
				forgetPassword: {
                    method: 'POST',
					url: apiUrl + '/user/forget',
                    params: {
						mail : '@mail'
                    }
                }, */
			  update: {
                    method: 'PUT'
                }
            });
        }
    ]);
