angular.module('observer-webclient')

.controller('RegisterCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location) {
    $scope.register = {
        email: "",
        password : ""
    };

    var registerSuccessHandler = function (result) {
        // $cookieStore.put('user', result.data);
        alertHandler.alert('success', "register success!");
        $location.path("/#register")
    };

    var registerErrorHandle = function (err) {
        alertHandler.alert('danger', err.data.error)
    };


    $scope.doRegister = function () {
        $http.post('/register', $scope.register).then(registerSuccessHandler, registerErrorHandle);
    };
}]);