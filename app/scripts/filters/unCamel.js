'use strict';
var unCamelFilter;

unCamelFilter = angular.module('unCamelFilter', []);

unCamelFilter.filter('unCamel', function() {
    return function(input) {
        var titleString;

        // if the filter is taking in nothing
        if (_.isUndefined(input)) {
            return;
        }

        // split where capital letters exist to spaces
        titleString = input.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
        titleString = titleString.replace(/^./, function(string) {
            return string.toUpperCase();
        });
        return titleString;
    };
});