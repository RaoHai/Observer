
angular.module('observer-webclient')

.controller('ProjectCreationCtrl', ['$scope', '$http', 'projectsManager', function ($scope, $http, projectsManager) {
    $scope.createProject = function () {
        console.log(" > ", $scope.newProject);
        projectsManager.createProject($scope.newProject);
    };
}]);