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
        var studentClass = [
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior',
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior',
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior',
            'Graduate Program',
            'Graduate Program',
            'Graduate Program',
            'Graduate Program',
            'Doctoral Candidate',
            'Post-Doctorate'
        ];
        var underGradDorms = [
            'Smith Hall',
            'Johnson Towers',
            'Jones Hall',
            'Mayfield Hall'
        ];
        var gradDorms = [
            'Masters Building',
            'Off Campus Housing'
        ];
        var postGradDorms = [
            'Off Campus Housing'
        ]
        var listSize = 10;
        var _i;

        var randStr = function() {
            return Math.random().toString(10).slice(-4);
        }
        var weights = [
            0.025, 0.05, 0.075, 0.125, 0.175, 0.25, 0.225, 0.075
        ];
        var foo = Math.random() * 0.5;
        window.console.log(foo);
        $scope.data = [];
        for (_i = 0; _i < listSize; _i = _i + 1) {
            var letter = _.random(0, nameTemplate.length - 1);
            var year = _.random(0, studentClass.length - 1);

            var gradeBuff = Math.floor(Math.random() * 50) / 100;
            var setGrade = Math.random();
            var letterGrade = 0;

            var _l, gradePoint, gpa;

            gradePoint = 0

            for (_l in weights) {
                gradePoint = gradePoint + weights[_l];
                if (setGrade < gradePoint) {
                    gpa = letterGrade + gradeBuff;
                    break;
                }
                letterGrade = letterGrade + 0.5
            }

            var dorm;
            if (studentClass[year] === 'Graduate Program') {
                dorm = gradDorms[_.random(0, gradDorms.length - 1)];
            }
            else if (studentClass[year] === 'Doctoral Candidate' || studentClass[year] === 'Post-Doctorate') {
                dorm = postGradDorms[_.random(0, postGradDorms.length - 1)];
            }
            else {
                dorm = underGradDorms[_.random(0, underGradDorms.length - 1)];
            }

            letter = nameTemplate[letter] + '-' + randStr();
            var namesArray = _.pluck($scope.data, 'name');

            var uniqueNameSpot = namesArray.indexOf(letter);

            if (uniqueNameSpot === -1) {
                while (uniqueNameSpot !== -1) {
                    letter = nameTemplate[letter] + '_' + randStr();
                    uniqueNameSpot = namesArray.indexOf(letter);
                }
            }
            $scope.data[_i] = {
                userName: letter,
                classYear: studentClass[year],
                dorm: dorm,
                gpa: gpa
            };
        }
    }]);
    