'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:SignInCtrl
 * @description
 * # SignInCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('SignInCtrl', ['$scope', '$rootScope', '$location', 'securityService', function($scope, $rootScope, $location, securityService) {
        $scope.signIn = function() {
        	securityService.signIn($scope.credentials, function(session) {
                $rootScope.session = session;
        		$location.path('/home');
        	});
        };

    }])
    .controller('SignOutCtrl', ['$scope', '$rootScope', '$location', 'securityService', function($scope, $rootScope, $location, securityService) {
        $scope.signOut = function() {
        	securityService.signOut(function() {
                $rootScope.session = null;
                $location.path('/security/signIn');
        	});
        };
    }]);
