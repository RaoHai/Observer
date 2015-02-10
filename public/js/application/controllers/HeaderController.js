angular.module('observer-webclient')

.controller('HeaderController', ['$cookieStore', '$scope', 'userMgr', function ($cookieStore, $scope, userMgr) {
    
    var user = userMgr.user;
    $scope.user = user;

    console.log("HeaderController:", user);
}]);