
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
}]);