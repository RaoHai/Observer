angular.module('observer-webclient')

.controller('HeaderController', ['$cookieStore', '$scope', function ($cookieStore, $scope) {
    
    console.log(">>>", $cookieStore.get('user'));
    $scope.user = $cookieStore.get('user');
}]);