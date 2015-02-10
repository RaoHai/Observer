
angular.module('observer-webclient')

.controller('ProjectCreationCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.createProject = function () {
        console.log(" > ", $scope.newProject);
        $http.post('/projects', $scope.newProject).then(function (result) {
            console.log("createProject:", result);
        });
    };
}]);