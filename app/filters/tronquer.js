angular.module('biblioWebApp')
.filter('texteATronquer', function () {
    return function (value, max, wordwise, substitut) {
        // Si pas de texte a afficher
        if(!value){
            return '';
        }
        // Parsing de la valeur maximale
        max = parseInt(max, 10);
        // S'il n'y a pas de valeur maximale,
        if(!max){
            return {textWithoutSubstitut: value, textWithSubstitut: value};
        }
        // Si le texte ne necessite pas d'etre tronquer
        if(value.length <= max){
            return {textWithoutSubstitut: value, textWithSubstitut: value};
        }
        // Extraire le sous texte correspondant à la taille maximale
        value = value.substr(0, max);
        // S'il faut tronquer mot par mot
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        // S'il faut afficher les liens "voir plus" et "voir moins"
        if(substitut === 'viewMoreAndLessLinks'){
            substitut = '<a href="javascript:void(0)" ng-click="showOrHideMoreText(false);" ng-show="textCuted"> ...&nbsp;Voir plus</a><a href="javascript:void(0)" ng-click="showOrHideMoreText(true);" ng-hide="textCuted">&nbsp;Voir moins</a>';
        }
        return {textWithoutSubstitut: value, textWithSubstitut: value + (substitut || ' …')};
    };
});