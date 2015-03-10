'use strict';

angular.module('mousethiefApp')
    .controller('TableSortController', ['$scope', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var nameTemplate = [
            'Alpha',
            'Beta',
            'Gamma',
            'Delta',
            'Epsilon',
            'Zeta',
            'Eta'
        ];
        var listSize = 5;
        var _i;

        var randStr = function() {
            return Math.random().toString(36).slice(-5);
        }
        $scope.data = [];
        for (_i = 0; _i < listSize; _i = _i + 1) {
            var letter = _.random(0, nameTemplate.length - 1);

            letter = nameTemplate[letter] + '_' + randStr();
            $scope.namesArray = _.pluck($scope.data, 'name');

            var uniqueNameSpot = $scope.namesArray.indexOf(letter);

            if (uniqueNameSpot === -1) {
                while (uniqueNameSpot !== -1) {
                    letter = nameTemplate[letter] + '_' + randStr();
                    uniqueNameSpot = $scope.namesArray.indexOf(letter);
                }
            }
            $scope.data[_i] = {
                name: letter
            }
        }
    }]);
    