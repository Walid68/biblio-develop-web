'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:LanguageCtrl
 * @description
 * # LanguageCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('LanguageCtrl', ['$scope', '$translate', 'availableLanguages', function($scope, $translate, availableLanguages) {

        $scope.availableLanguages = availableLanguages;

        $scope.isCurrentLanguage = function(language) {
    		return language === $translate.use();
    	};

        $scope.use = function(language) {
            $translate.use(language);
        };
    }]);
