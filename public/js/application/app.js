'use strict';

angular.module('observer-webclient', [
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'alertHandler'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'}
    );

    $routeProvider.when('/login', {
        templateUrl : 'templates/login.html',
        controller: 'LoginCtrl'
    });

    $routeProvider.when('/register', {
        templateUrl : 'templates/register.html',
        controller: 'RegisterCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/dashboard'});
}])

.controller('AppCtrl', function () {

});

