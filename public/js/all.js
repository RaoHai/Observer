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
        $cookieStore.put('observer-credentials', credentials);
        $cookieStore.put('login-user', result.data);  
        userMgr.setUser(result.data);
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

.controller('ProjectCreationCtrl', ['$scope','$rootScope', '$http', 'projectsManager','alertHandler', function ($scope, $rootScope, $http, projectsManager,alertHandler) {
    $scope.modalTitle = "Create Project";

    $scope.createProject = function () {
        console.log(" > ", $scope.newProject);
        projectsManager.createProject($scope.newProject).then(function () {
            alertHandler.alert('success', "create success!");
            $rootScope.cancel();
        });
    };
}]);;angular.module('observer-webclient')

.controller('ProjectCtrl', ['$scope', '$http', '$rootScope', 'projectsManager', 'alertHandler', function ($scope, $http, $rootScope, projectsManager, alertHandler) {
    
    $scope.projects = projectsManager.projects;
    $scope.currentProject = projectsManager.currentProject;
    projectsManager.fetch();


    $scope.deleteProject = function (project) {
        if (confirm("sure to delete project : " + project.name + " ?")) {
            projectsManager.deleteProject(project).then(function () {
                alertHandler.alert('success', "delete success!");
                projectsManager.fetch();
            });
        }
    };

    $scope.editProject = function (project) {
        projectsManager.setCurrentProject(project);

        var options = {
            templateUrl: 'projectEditModal.html',
            size: 'lg',
            controller: 'ProjectEditCtrl'
        };

        $rootScope.openModal(options);
    };
    
    $scope.fetchRss = function () {
        $http.get('/feed/?url=' + encodeURIComponent($scope.currentProject.url)).then(function (result) {
            console.log(" --> rss", result);
        });
    };

    $scope.setCurrentProject = function (project) {
        projectsManager.setCurrentProject(project);
    };

    $scope.newProject = function () {
        var options = {
            templateUrl: 'projectCreateModal.html',
            size: 'lg',
            controller: 'ProjectCreationCtrl'
        };

        $rootScope.openModal(options);
    };
}]);;angular.module('observer-webclient')

.controller('ProjectEditCtrl', ['$scope','$rootScope', '$http', 'projectsManager','alertHandler', function ($scope, $rootScope, $http, projectsManager,alertHandler) {
    
    $scope.modalTitle = "Edit Project";

    $scope.newProject = angular.copy(projectsManager.currentProject);

    $scope.updateProject = function () {
        console.log(" > ", $scope.newProject);
        projectsManager.updateProject($scope.newProject).then(function () {
            alertHandler.alert('success', "create success!");
            $rootScope.cancel();
        });
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
    .factory('userMgr', ['$cookieStore', function($cookieStore) {
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

        if ($cookieStore && $cookieStore.get('observer-user')) {
            setUser($cookieStore.get('observer-user'));
        }

        angular.extend(userMgr, {
            //properties
            user : user,
            //methods
            setUser: setUser,
            updateLoggedUser: updateLoggedUser
        });

        return userMgr;
}]);;angular.module('projectsManager', [])
    .factory('projectsManager', ['$http','$q','$rootScope', function($http, $q, $rootScope) {
        var projectsManager = {},
        projects            = [],
        currentProject      = {};

        var setCurrentProject = function (project) {
            project.active = true;
            angular.extend(projectsManager.currentProject, project);
        };

        var updateCurrentProject = function (updatedProject) {
            currentProject.name = updatedProject.name;
            currentProject.url = updatedProject.url;
            currentProject.production = updatedProject.description;
            
            angular.forEach(projects, function (item) {
                if (item.id == updatedProject.id) {
                    item.name = updatedProject.name;
                    item.url = updatedProject.url;
                    item.production = updatedProject.description;
                }
            });
        };

        var fetch = function () {
            var defer = $q.defer();
            projects.length = 0;
            $http.get('/projects').then(function (result) {
                angular.forEach(result.data, function (item) {
                    projects.push(item);
                });
                defer.resolve(projects);
            });

            return defer.promise
        };

        var updateProject = function (project) {
            return $http.put('/projects/' + project.id, project).then(function (result) {
                updateCurrentProject(result.data);
                $rootScope.$broadcast('project.update');
            });
        };

        var createProject = function (project) {
            return $http.post('/projects', project).then(function (result) {
                angular.forEach(result.data, function (item) {
                    projects.push(item);
                });
                $rootScope.$broadcast('project.created');
            });
        }

        var deleteProject = function (project) {
            return $http.delete('/projects/' + project.id);
        };



        angular.extend(projectsManager, {
            projects: projects,
            currentProject : currentProject,
            //methods
            setCurrentProject: setCurrentProject,
            updateCurrentProject: updateCurrentProject,
            updateProject : updateProject,
            fetch : fetch,
            createProject : createProject,
            deleteProject : deleteProject
        });

        return projectsManager;
}]);;angular.module('alertHandler', [])
.service('alertHandler', ['$rootScope', function ($rootScope) {
    this.alert = function (type, message, callback) {
        var timeout =  5000;

        $rootScope.showAlert = true;
        $rootScope.alertCategory = 'alert-' + type;
        $rootScope.alertMessage = message;

        setTimeout(function () {
            $rootScope.showAlert = false;
            if (callback && typeof callback == "function") {
                callback();
            }
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
        var credentials = $cookieStore.get('observer-credentials');
        console.log("setAuthorization:", credentials);

        if (credentials) {
            $http.defaults.headers.common.Authorization = credentials
        }
    };

    var checkSession = function (event, next, current) {
        console.log("checkSession > ", next);

        if (next.$$route && next.$$route.secure) {
            if (!$cookieStore.get('observer-credentials')) {
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