angular.module('observer-webclient')

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
}]);