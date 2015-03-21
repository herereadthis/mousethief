        var clickMeModule = angular.module('clickMeModule', [
            // "atellis.shared.dropDownMenuModule"
        ]);

        clickMeModule.directive('clickMe', function () {
            return {
                restrict: 'E',
                scope: {
                    mainAction: "=",
                    secondaryActions: "=",
                    label: "@actionBarDropDownLabel"
                },
                templateUrl: '/scripts/componentDemo/clickMe/clickMe.html',
                link: function ($scope, element, attr) {
                }
            };
        });