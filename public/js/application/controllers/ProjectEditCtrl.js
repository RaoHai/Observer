angular.module('observer-webclient')

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
}]);