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


angular.module('managers', ['userMgr']);




;angular.element(document).ready(function() {
  angular.bootstrap(document, ['observer-webclient']);
});;angular.module('observer-webclient')

.controller('DashboardCtrl', function () {
    
});
;angular.module('observer-webclient')

.controller('HeaderController', ['$cookieStore', '$scope', 'userMgr', function ($cookieStore, $scope, userMgr) {
    
    var user = userMgr.user;
    $scope.user = user;

    console.log("HeaderController:", user);
}]);;angular.module('observer-webclient')

.controller('LoginCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', '$base64' ,'sessionManager', 'userMgr', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location, $base64, sessionManager, userMgr) {
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
            userMgr.setUser(result.data);
        }
        sessionManager.setAuthorization();
        alertHandler.alert('success', "login success!", function () {
            $location.path("/"); 
        });

    };

    $scope.doLogin = function () {
        $http.post('/login', $scope.login).then(loginSucceesHandle, loginErrorHandle);
    };


}]);;
angular.module('observer-webclient')

.controller('ProjectCreationCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.createProject = function () {
        console.log(" > ", $scope.newProject);
        $http.post('/projects', $scope.newProject).then(function (result) {
            console.log("createProject:", result);
        });
    };
}]);;angular.module('observer-webclient')

.controller('ProjectCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $http.get('/projects').then(function (projects) {
        console.log("get projects:", projects);
        $scope.projects = projects.data;
    });

    
    $scope.openModal = function (size) {
        var options = {
            templateUrl: 'projectCreateModal.html',
            size: size,
            controller: 'ProjectCreationCtrl'
        };

        $rootScope.openModal(options);
    };
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
}]);;angular.module('userMgr', [])
    .factory('userMgr', [function() {
        var userMgr = {};

        var user = {};

        var setUser = function (json) {
            json.active = true;
            angular.extend(userMgr.user, json);
        };

        var updateLoggedUser = function (updatedUser) {
            user.username = updatedUser.username;
            user.role = updatedUser.role;
        };




        angular.extend(userMgr, {
            //properties
            user : user,
            //methods
            setUser: setUser,
            updateLoggedUser: updateLoggedUser
        });

        return userMgr;
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
.factory('modalManager', ['$rootScope', '$modal', function ($rootScope, $modal) {
    var self = this;

    $rootScope.openModal = function (options) {

        self.$modalInstance = $modal.open(options);

        self.$modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $rootScope.cancel = function () {
        console.log("cancel:");
        self.$modalInstance.dismiss('cancel');
    };

    return {

    };


}]);;angular.module('sessionManager', [])
.factory('sessionManager', ['$cookieStore', '$rootScope' ,'$location', '$http', function ($cookieStore, $rootScope, $location, $http) {
    
    var setAuthorization = function () {
        var credentials = $cookieStore.get('credentials');

        if (credentials) {
            $http.defaults.headers.common.Authorization = credentials
        }
    };

    var checkSession = function (event, next, current) {
        console.log("checkSession > ", next);

        if (next.$$route && next.$$route.secure) {
            if (!$cookieStore.get('user')) {
                console.log("here!");
                event.preventDefault();
                $rootScope.$evalAsync(function() {
                    $location.path('/login');
                });
            }
        }
    };

    


    $rootScope.$on("$routeChangeStart", checkSession);
    
    setAuthorization();

    return {
        check: checkSession,
        setAuthorization : setAuthorization
    };
}]);