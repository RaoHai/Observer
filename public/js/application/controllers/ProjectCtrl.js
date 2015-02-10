angular.module('observer-webclient')

.controller('ProjectCtrl', ['$scope', '$http', '$modal', '$rootScope', function ($scope, $http, $modal, $rootScope) {
    $http.get('/projects').then(function (projects) {
        console.log("get projects:", projects);
        $scope.projects = projects.data;
    });

    
}]);