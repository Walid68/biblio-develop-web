angular.module('biblioWebApp')
.filter('pointedTimeToTime', function() {
    return function(input) {
        var inputStr = input.toString();

        // Add ".00" is string doesn't contain a dot (round hour)
        if(!inputStr.match(/\./i)) { inputStr = inputStr + ".00"; }

        // Split by dot
        inputStr = inputStr.split(".");
        // Left pad hours with zeroes to length 2
        while(inputStr[0].length < 2){
            inputStr[0] = "0" + inputStr[0];
        }
        // Right pad minutes with zeroes to length 2
        while(inputStr[1].length < 2){
            inputStr[1] = inputStr[1] + "0";
        }
        // Return joined string
        return inputStr.join(':');
    }
});
