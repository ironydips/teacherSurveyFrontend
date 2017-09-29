(function(angular) {
    "use strict";

    angular.module('sellPurchaseApp.commonModule')
        .filter('commaSeparationFilter', function() {
            return function(input, key) {
                input = input || [];
                var values = [];
                for (var i = 0; i < input.length; i++) {
                    values.push(input[i][key]);
                }
                return values.join(', ');
            };
        });


})(window.angular)
