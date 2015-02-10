angular.module('sessionManager', [])
.factory('sessionManager', ['$cookieStore', '$rootScope' ,'$location', '$http', function ($cookieStore, $rootScope, $location, $http) {
    var credentials = $cookieStore.get('credentials');
    console.log(">> get credentials:", credentials);
    if (credentials) {
        $http.defaults.headers.common.Authorization = credentials
    }


    var checkSession = function (event, next, current) {
        console.log("checkSession> ", next);

        if (next && next.secure) {
            if (!$cookieStore.get('user')) {
                event.preventDefault();
                $rootScope.$evalAsync(function() {
                    $location.path('#/login?redirect=' + next.$$route.originalPath);
                });
            }
        }
    };

    $rootScope.$on("$routeChangeStart", checkSession);

    return {
        check: checkSession
    };
}]);