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

;angular.element(document).ready(function() {
  angular.bootstrap(document, ['observer-webclient']);
});;angular.module('observer-webclient')

.controller('DashboardCtrl', function () {
    
});
;angular.module('observer-webclient')

.controller('HeaderController', ['$cookieStore', '$scope', function ($cookieStore, $scope) {
    console.log(">>>", $cookieStore.get('user'));
    $scope.user = $cookieStore.get('user');
}]);;angular.module('observer-webclient')

.controller('LoginCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location) {
    $scope.user = $cookieStore.get('user');

    $scope.login = {
        email : "",
        password : "",
        remember : false
    };

    var loginErrorHandle = function (err) {
        // $rootScope.showAlert = true;
        // $rootScope.alertCategory = "alert-danger";
        // $rootScope.alertMessage = err.data.error;
        alertHandler.alert('danger', err.data.error)
    };

    var loginSucceesHandle = function (result) {
        $cookieStore.put('user', result.data);
        alertHandler.alert('success', "login success!");
        $location.path("/")

    };

    $scope.doLogin = function () {
        $http.post('/login', $scope.login).then(loginSucceesHandle, loginErrorHandle);
    };


}]);;angular.module('observer-webclient')

.controller('RegisterCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location) {
    $scope.register = {
        email: "",
        password : ""
    };

    var registerSuccessHandler = function (result) {
        $cookieStore.put('user', result.data);
        alertHandler.alert('success', "register success!");
        $location.path("/#register")
    };

    var registerErrorHandle = function (err) {
        alertHandler.alert('danger', err.data.error)
    };


    $scope.doRegister = function () {
        $http.post('/register', $scope.register).then(registerSuccessHandler, registerErrorHandle);
    };
}]);;angular.module('alertHandler', [])
.service('alertHandler', ['$rootScope', function ($rootScope) {
    this.alert = function (type, message, timeout) {
        timeout = timeout || 5000;

        $rootScope.showAlert = true;
        $rootScope.alertCategory = 'alert-' + type;
        $rootScope.alertMessage = message;

        setTimeout(function () {
            $rootScope.showAlert = false;
            $rootScope.$apply();
        }, timeout);

    };
}]);