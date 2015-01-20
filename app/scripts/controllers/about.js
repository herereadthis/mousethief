'use strict';

/**
 * @ngdoc function
 * @name mousethiefApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mousethiefApp
 */
angular.module('mousethiefApp')
    .controller('AboutCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
