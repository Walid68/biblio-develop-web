'use strict';

/**
 * @ngdoc service
 * @name biblioWebApp.securityService
 * @description
 * # securityService
 * Factory in the biblioWebApp.
 */
angular.module('biblioWebApp')
    .factory('securityService', ['$resource', '$base64', 'apiUrl',
        function($resource, $base64, apiUrl) {
            return $resource(apiUrl + '/security/:action', {}, {
                getConnectedUser: {
                    method: 'GET',
                    params: {
                        action: 'connectedUser'
                    }
                },

                signIn: {
                    method: 'POST',
                    params: {
                        action: 'signIn'
                    }
                },

                signOut: {
                    method: 'POST',
                    params: {
                        action: 'signOut'
                    }
                }
            });
        }
    ]);
