'use strict';

angular.module('observer-webclient', [
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'alertHandler',
    'managers',
    'sessionManager',
    'modalManager',
    'base64',
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

    $routeProvider.when('/projects', {
        secure: true,
        templateUrl: 'templates/projects.html',
        controller: 'ProjectCtrl'
    })

    $routeProvider.otherwise({redirectTo: '/dashboard'});
}])

.controller('AppCtrl', ['sessionManager', 'modalManager', function (sessionManager, modalManager) {

}]);


angular.module('managers', ['userMgr', 'projectsManager']);




