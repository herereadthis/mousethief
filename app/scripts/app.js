'use strict';

/**
 * @ngdoc overview
 * @name mousethiefApp
 * @description
 * # mousethiefApp
 *
 * Main module of the application.
 */
angular
  .module('mousethiefApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'humanTimeFilter'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/human-time', {
          templateUrl: 'scripts/componentDemo/humantime/human-time-view.html',
          controller: 'HumanTimeController'
      })
      .when('/table-sort', {
          templateUrl: 'scripts/componentDemo/tableSort/table-sort-view.html',
          controller: 'TableSortController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
