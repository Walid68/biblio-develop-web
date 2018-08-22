'use strict';

/**
 * Controller of modal pdf
 */
angular.module('biblioWebApp')
    .controller('ModalPdfCtrl', ['$scope', '$rootScope', 'url',
        function($scope, $rootScope, url) {
        	console.log(url);
            $scope.url = url;
        }
    ]);
