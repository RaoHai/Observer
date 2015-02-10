'use strict';

angular.module('observer-webclient', [
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'alertHandler',
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

.controller('LoginCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', '$base64', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location, $base64) {
    $scope.user = $cookieStore.get('user');

    $scope.login = {
        email : "",
        password : "",
        remember : false
    };

    var loginErrorHandle = function (err) {
        alertHandler.alert('danger', err.data.error)
    };

    var loginSucceesHandle = function (result) {
        var credentials = "Basic " + $base64.encode($scope.login.email + ":" + $scope.login.password);
        $cookieStore.put('credentials', credentials);
        if ($scope.login.remember) {
            $cookieStore.put('user', result.data);  
        }
        alertHandler.alert('success', "login success!", function () {
            $location.path("/"); 
        });

    };

    $scope.doLogin = function () {
        $http.post('/login', $scope.login).then(loginSucceesHandle, loginErrorHandle);
    };


}]);;angular.module('observer-webclient')

.controller('ProjectCtrl', ['$scope', '$http', '$modal', '$rootScope', function ($scope, $http, $modal, $rootScope) {
    $http.get('/projects').then(function (projects) {
        console.log("get projects:", projects);
        $scope.projects = projects.data;
    });

    
}]);;angular.module('observer-webclient')

.controller('RegisterCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location) {
    $scope.register = {
        email: "",
        password : ""
    };

    var registerSuccessHandler = function (result) {
        // $cookieStore.put('user', result.data);
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
    this.alert = function (type, message, callback) {
        var timeout =  5000;

        $rootScope.showAlert = true;
        $rootScope.alertCategory = 'alert-' + type;
        $rootScope.alertMessage = message;

        setTimeout(function () {
            $rootScope.showAlert = false;
            callback();
            $rootScope.$apply();
        }, timeout);

    };
}]);;angular.module('modalManager', [])
.factory('modalManager', ['$rootScope', function ($rootScope) {
    var self = this;

    $rootScope.openModal = function (size) {

        self.$modalInstance = $modal.open({
            templateUrl: 'templates/projectCreationModal.html',
            size: size
        });

        self.$modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $rootScope.cancel = function () {
        console.log("cancel:");
        self.$modalInstance.dismiss('cancel');
    };


}]);;angular.module('sessionManager', [])
.factory('sessionManager', ['$cookieStore', '$rootScope' ,'$location', '$http', function ($cookieStore, $rootScope, $location, $http) {
    var credentials = $cookieStore.get('credentials');
    console.log(">> get credentials:", credentials);
    if (credentials) {
        $http.defaults.headers.common.Authorization = credentials
    }


    var checkSession = function (event, next, current) {
        console.log("checkSession> ", next);

        if (next && next.secure) {
            if (!$cookieStore.get('user')) {
                event.preventDefault();
                $rootScope.$evalAsync(function() {
                    $location.path('#/login?redirect=' + next.$$route.originalPath);
                });
            }
        }
    };

    $rootScope.$on("$routeChangeStart", checkSession);

    return {
        check: checkSession
    };
}]);