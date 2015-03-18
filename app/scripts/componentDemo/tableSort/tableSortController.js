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
        var majors = {
            undergrad: [
                'biology',
                'history',
                'chemistry',
                'physics',
                'economics',
                'english',
                'computer science',
                'pre-law',
            ],
            graduate: [
                'law',
                'medicine',
                'business',
                'chemistry',
                'computer science',
                'neuroscience'
            ],
            doctorate: [
                'neuroscience',
                'physics',
                'chemistry',
            ]
        }

        // determine student's current year enrollment
        var studentClass, _n;
        studentClass = {
            bias: [3, 3, 3, 3, 4, 1, 1],
            name: [
                'freshman',
                'sophomore',
                'junior',
                'senior',
                'graduate program',
                'doctoral candicate',
                'post-doctorate'
            ],
            weightSum: 0,
            weightTotal: 0
        };
        for (_n in studentClass.bias) {
            studentClass.weightSum = studentClass.weightSum + studentClass.bias[_n];
        }
        for (_n in studentClass.bias) {
            studentClass.bias[_n] = studentClass.bias[_n] / studentClass.weightSum;
            studentClass.weightTotal = studentClass.weightTotal + studentClass.bias[_n];
        }

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
            1, 2, 4, 6, 9, 12, 10, 5
        ];
        var weightSum = 0;
        var _m;
        for (_m in weights) {
            weightSum = weightSum + weights[_m];
        }
        for (_m in weights) {
            weights[_m] = weights[_m] / weightSum;
        }

        var getSSN = function() {
            var zeroDiff, _j, _k, ssn, ssnString;
            ssn = [
                {
                    strLen: 3,
                    num: _.random(0, 999).toString()
                },
                {
                    strLen: 2,
                    num: _.random(0, 99).toString()
                },
                {
                    strLen: 4,
                    num: _.random(0, 9999).toString()
                }
            ];
            for (_j in ssn) {
                if (ssn[_j].num.length < ssn[_j].strLen) {
                    zeroDiff = ssn[_j].strLen - ssn[_j].num.length;
                    for (_k = 0;_k < zeroDiff;_k = _k + 1) {
                        ssn[_j].num = '0' + ssn[_j].num;
                    }
                }
            }
            ssnString = ssn[0].num + '-' + ssn[1].num + '-' + ssn[2].num;
            return ssnString;
        };


        $scope.data = [];
        for (_i = 0; _i < listSize; _i = _i + 1) {
            var letter = _.random(0, nameTemplate.length - 1);
            // var year = _.random(0, studentClass.length - 1);
            var year;

            var setYear = Math.random();

            var _o;
            studentClass.weightSum = 0;

            for (_o in studentClass.bias) {
                studentClass.weightSum = studentClass.weightSum + studentClass.bias[_o];
                if (setYear < studentClass.weightSum) {
                    year = _o;
                    window.console.log(year);
                    break;
                }
            }

            var gradeBuff = Math.floor(Math.random() * 50) / 100;
            var setGrade = Math.random();
            var letterGrade = 0;
            var ssn = [];

            var _l, gradePoint, gpa;

            gradePoint = 0

            for (_l in weights) {
                gradePoint = gradePoint + weights[_l];
                if (setGrade < gradePoint) {
                    gpa = letterGrade + gradeBuff;
                    break;
                }
                letterGrade = letterGrade + 0.5;
            }
            letterGrade = letterGrade.toFixed(20);

            var dorm, major;
            if (studentClass.name[year] === 'graduate program') {
                dorm = gradDorms[_.random(0, gradDorms.length - 1)];
                major = majors.graduate[_.random(0, majors.graduate.length - 1)];
            }
            else if (studentClass.name[year] === 'doctoral candidate' || studentClass.name[year] === 'post-doctorate') {
                dorm = postGradDorms[_.random(0, postGradDorms.length - 1)];
                major = majors.doctorate[_.random(0, majors.doctorate.length - 1)];
            }
            else {
                dorm = underGradDorms[_.random(0, underGradDorms.length - 1)];
                major = majors.undergrad[_.random(0, majors.undergrad.length - 1)];
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


            var newSSN = getSSN();
            var ssnArray = _.pluck($scope.data, 'ssn');
            var uniqueSsnSpot = namesArray.indexOf(newSSN);
            if (uniqueNameSpot === -1) {
                while (uniqueNameSpot !== -1) {
                    newSSN = getSSN();
                    uniqueSsnSpot = namesArray.indexOf(newSSN);
                }
            }


            $scope.data[_i] = {
                userName: letter,
                classYear: studentClass.name[year],
                dorm: dorm,
                gpa: gpa,
                ssn: newSSN,
                major: major
            };
        }
    }]);
    