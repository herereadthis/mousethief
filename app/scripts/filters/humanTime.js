'use strict';

var humanTimeModule = angular.module('atellis.shared.humanTimeModule', []);

humanTimeModule.filter('humanTime', function () {
    // localization!
    var currentDateTime, i18nTime, words, getWords, setLanguage;

    currentDateTime = new Date();

    i18nTime = {
        /* lang: [
            'now',
            'seconds',
            'minute',
            'minutes',
            'hour',
            'hours',
            'day',
            'days',
            'month',
            'months',
            'year',
            'years'
        ] */
        eng: [
            'just now',
            'seconds ago',
            'about a minute ago',
            'minutes ago',
            'about an hour ago',
            'hours ago',
            '1 day ago',
            'days ago',
            'about a month ago',
            'months ago',
            'about a year ago',
            'years ago'
        ],
        fre: [],
        ger: [],
        spa: []
    };
    words = [
        {
            minTime: 0,
            divider: false
        },
        {
            minTime: 10,
            divider: 1
        },
        {
            minTime: 31,
            divider: false
        },
        {
            minTime: 91,
            divider: 60
        },
        {
            minTime: 2700,
            divider: false
        },
        {
            minTime: 5460,
            divider: 3600
        },
        {
            minTime: 86400,
            divider: false
        },
        {
            minTime: 172800,
            divider: 86400
        },
        {
            minTime: 2592000,
            divider: false
        },
        {
            minTime: 3888000,
            divider: 2592000
        },
        {
            minTime: 31536000,
            divider: false
        },
        {
            minTime: 47174400,
            divider: 31536000
        }

    ];

    // specify in filter or constant a language to localize
    setLanguage = function(localize) {
        var supportedLanguages, language, _i;

        // get set of supported languages
        supportedLanguages = _.keys(i18nTime);
        // find language if language is specified in filter
        if (!_.isNull(localize) && !_.isUndefined(localize)) {
            if (_.indexOf(supportedLanguages, localize) > 0) {
                language = localize;
            }
        }
        // if no lanaguage is specified or incorrect specification, default to english
        if (_.isUndefined(language)) {
            language = 'eng';
        }
        // populate time array with language
        for (_i in words) {
            words[_i].phrase = i18nTime[language][_i];
        }
    };

    // get correct phrasing based on time from current
    getWords = function(secondsDist) {
        var wordsObj;

        // get array of objects that are below the time distance
        wordsObj = _.filter(words, function(num) {
            return secondsDist >= num.minTime;
        });
        // return closest value to time distance
        return _.last(wordsObj);
    };

    return function (input, localize) {
        var inputTime, distance, secondsDist, wordObj, timePhrase;

        // set the locality for language
        setLanguage(localize);
        // convert date input to numerical value
        inputTime = new Date(input);
        // get time distance, in milliseconds
        distance = currentDateTime - inputTime;
        // we are not concerned with milliseconds.
        secondsDist = Math.ceil(distance / 1000);
        // get correct phrasing based on time distance
        wordObj = getWords(secondsDist);
        // some phrases don't require a number, e.g., "about an hour ago"
        if (wordObj.divider === false) {
            timePhrase = wordObj.phrase;
        }
        // otherwise, attach correct time increment to phrasing
        else {
            timePhrase = Math.floor(secondsDist / wordObj.divider) + ' ' + wordObj.phrase;
        }
        return timePhrase;
    }
});