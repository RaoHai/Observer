angular.module('alertHandler', [])
.service('alertHandler', ['$rootScope', function ($rootScope) {
    this.alert = function (type, message, callback) {
        var timeout =  5000;

        $rootScope.showAlert = true;
        $rootScope.alertCategory = 'alert-' + type;
        $rootScope.alertMessage = message;

        setTimeout(function () {
            $rootScope.showAlert = false;
            if (callback && typeof callback == "function") {
                callback();
            }
            $rootScope.$apply();
        }, timeout);

    };
}]);