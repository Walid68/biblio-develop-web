angular.module('biblioWebApp' )
.directive("ajusterTexte", function($filter, $compile) {
 
    function link(scope, element) {    
        // Les clicks sur les liens voir plus / moins
        scope.showOrHideMoreText = function(val){
           setElementText(val ? angular.copy(scope.maxValue) : 'none');
        }
 
        // Mise a jour du texte de l'element
        function setElementText(newMaxValue){
            // La limite de caracteres
            var charactersLimit = calculateLimitCharacter(newMaxValue);
            // On filtre le text pour savoir s'il faut le couper ou non
            scope.shortText = $filter('texteATronquer')(scope.value, charactersLimit, scope.wordwise, scope.substitut);
            // On teste si le text a ete coupé pour afficher l'affichage du lien "voir plus"
            if ((scope.value).length > (scope.shortText.textWithoutSubstitut).length + 1) {
                scope.textCuted = true;
            }else{
                scope.textCuted = false;
            }
            // On raffraichit le contenu de l'html dans la vue
            element.html('');
            element.html(scope.shortText.textWithSubstitut);
            $compile(element.contents())(scope);
        }
 
        function calculateLimitCharacter(newMaxValue){
            // Si le text doit etre limité en fonction de la largeur du conteneur
            if (newMaxValue === 'eltWidth') {
                return element[0].offsetWidth/12;
            // S'il faut reafficher tout le texte en entier
            }else if(newMaxValue === 'none'){
                return (scope.substitut === 'viewMoreAndLessLinks' ? ((scope.value).length - 1) : (scope.value).length);
            // Si le text doit etre limité à une valeur
            }else{
                return newMaxValue;
            }
        }
        // Init text adjust
        setElementText(scope.maxValue);
    }
 
    return {
        restrict : "A",
        scope : {
            value : "=value",
            maxValue: "=",
            wordwise: "=",
            substitut : "="
        },
        transclude: true,
        link : link
    };
})