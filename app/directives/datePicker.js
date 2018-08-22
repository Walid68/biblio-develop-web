angular.module('biblioWebApp').directive('altgeniDatePicker', function factory() {
    var directiveDefinitionObject = {
        restrict:'EA',
        template: '<div class="form-group">' +
           '<label for="datePicker">{{label | translate}}</label> ' +
                '<p class="input-group"> ' +
                '<input type="text" name="datePicker" class="form-control" datepicker-popup="{{\'COMMON.DATE_FORMAT\' | translate}}" ' +
                'ng-model="dateToHandle" is-open="datebool" ng-change="onSelect(dateToHandle)" min-date="minDate" max-date="maxDate" minlength="10" maxlength="10" /> ' +
            '<span class="input-group-btn">' +
            '<button type="button" class="btn btn-default" ng-click="open($event, \'datebool\')"><i class="glyphicon glyphicon-calendar"></i></button> ' +
            '</span> ' +
            '</p> ' +
            '<div ng-messages="errMessage"> ' +
            '<div ng-messages-include="views/shared/messages.html"></div> ' +
            '</div> ' +
            '</div>',
        scope: { dateToHandle:'=dateToHandle', maxDate:'=maxDate', minDate:'=minDate', label:'@label', errMessage:'@errMessage', onSelect: '=onSelect' },
        controller: function controllerConstructor($scope) {
            //DatePicker
            $scope.open = function($event, opened) {
                $scope.datebool = $scope[opened];
                $event.preventDefault();
                $event.stopPropagation();
                $scope[opened] = !$scope[opened];
            };
        }
    };
    return directiveDefinitionObject;
});
