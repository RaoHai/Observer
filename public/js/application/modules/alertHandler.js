angular.module('alertHandler', [])
.service('alertHandler', ['$rootScope', function ($rootScope) {
    this.alert = function (type, message, timeout) {
        timeout = timeout || 5000;

        $rootScope.showAlert = true;
        $rootScope.alertCategory = 'alert-' + type;
        $rootScope.alertMessage = message;

        setTimeout(function () {
            $rootScope.showAlert = false;
            $rootScope.$apply();
        }, timeout);

    };
}]);