angular.module('observer-webclient')

.controller('ProjectCtrl', ['$scope', '$http', '$rootScope', 'projectsManager', function ($scope, $http, $rootScope, projectsManager) {
    
    $scope.projects = projectsManager.projects;
    projectsManager.fetch().then(function (result) {
        console.log("fetch result: ", result);
        console.log("projectsManager:", projectsManager.projects);
        console.log("scope projects:" , $scope.projects);
    });
    // $http.get('/projects').then(function (projects) {
    //     console.log("get projects:", projects);
    //     $scope.projects = projects.data;
    // });

    
    $scope.openModal = function (size) {
        var options = {
            templateUrl: 'projectCreateModal.html',
            size: size,
            controller: 'ProjectCreationCtrl'
        };

        $rootScope.openModal(options);
    };
}]);