'use strict';

/**
 * @ngdoc function
 * @name biblioWebApp.controller:userCtrl
 * @description
 * # UserCtrl
 * Controller of the biblioWebApp
 */
angular.module('biblioWebApp')
    .controller('UserCtrl', ['$scope', '$rootScope', '$translate', 'userService', 'userCtrlData', 'role',
        function($scope, $rootScope, $translate, userService, userCtrlData, role) {
            $scope.searchResult = userCtrlData.users;
            $scope.role = role;
            $scope.searchCriteria = {};
		
            $scope.search = function(page) {
                var searchCriteria = angular.extend($scope.searchCriteria, {
                    page: page,
                    size: 10,
                    role: role
                });
                userService.query(searchCriteria, function(data) {
                    $scope.searchResult = data;
                });
            };

            $scope.clear = function() {
                $scope.search(0);
            };

            $scope.generateNewPassword = function(row) {
				
                $rootScope.showConfirmationMessage('USER.GENERATE_NEW_PASSWORD.CONFIRMATION_MESSAGE', {
					
                    userName: row.fullName
                }, function() {
                    userService.generateNewPassword(row);
                });
            };
			 
			/*   $scope.forgetPassword = function(mail) {
                $rootScope.showConfirmationMessage('USER.GENERATE_NEW_PASSWORD.CONFIRMATION_MESSAGE', {
                    mail: managedMdp.mail
                }, function() {
                    userService.forgetPassword(mail);
                });
            };
  */
		    $scope.remove = function(row) {

                $rootScope.showConfirmationMessage('USER.REMOVE.CONFIRMATION_MESSAGE', {
                    userName: row.fullName
                }, function() {

                    userService.remove(row, function() {
						
                    	$rootScope.showSuccessMessage('REMOVE');
                        $scope.search(0);
                    });
                });
            };
        }
    ])
    .controller('UserManageCtrl', ['$scope', '$rootScope', '$translate', '$location', 'userService', 'userManageCtrlData', 'role',
        function($scope, $rootScope, $translate, $location, userService, userManageCtrlData, role) {
            $scope.managedUser = userManageCtrlData.user;
            $scope.operationMode = userManageCtrlData.operationMode;
            $scope.role = role;

            $scope.save = function(isValid) {
                if(!isValid) {
                    return;
                }
				

                if ($scope.operationMode === 'CREATE') {
				
                    userService.save($scope.managedUser, function() {
						  $rootScope.showSuccessMessage($scope.operationMode);
                        $location.path('/user/' + $scope.role.toLowerCase() + '/home');
                    });
                } 
				
				else if ($scope.operationMode === 'EDIT') {
					
					//$scope.managedUser.birthDay = moment($scope.managedUser.endDate).hours(0).minutes(0).seconds(0).format('YYYY-MM-DDTHH:mm:ssZ');
                    userService.update($scope.managedUser, function() {
                        $rootScope.showSuccessMessage($scope.operationMode);
                      
                           $location.path('/user/' + $scope.role.toLowerCase() + '/home');
                         
                    });
                }
            };
			   /* $scope.open = function($event, opened) {
				$scope.maxStartDate = '30-05-2015';
               	$event.preventDefault();
            	$event.stopPropagation();
            	$scope[opened] = true;
            }; */

        }
    ])


	
	;
