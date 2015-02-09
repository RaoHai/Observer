angular.module('observer-webclient')

.controller('LoginCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location) {
    $scope.user = $cookieStore.get('user');

    $scope.login = {
        email : "",
        password : "",
        remember : false
    };

    var loginErrorHandle = function (err) {
        // $rootScope.showAlert = true;
        // $rootScope.alertCategory = "alert-danger";
        // $rootScope.alertMessage = err.data.error;
        alertHandler.alert('danger', err.data.error)
    };

    var loginSucceesHandle = function (result) {
        $cookieStore.put('user', result.data);
        alertHandler.alert('success', "login success!");
        $location.path("/")

    };

    $scope.doLogin = function () {
        $http.post('/login', $scope.login).then(loginSucceesHandle, loginErrorHandle);
    };


}]);