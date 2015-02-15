angular.module('observer-webclient')

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
}]);