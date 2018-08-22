angular.module('biblioWebApp').directive('altgeniSmallLoader', function factory() {
    var directiveDefinitionObject = {
        restrict:'EA',
        template: '<img src="images/loader.gif">'
    };
    return directiveDefinitionObject;
});
