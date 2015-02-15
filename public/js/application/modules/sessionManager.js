angular.module('sessionManager', [])
.factory('sessionManager', ['$cookieStore', '$rootScope' ,'$location', '$http', function ($cookieStore, $rootScope, $location, $http) {
    
    var setAuthorization = function () {
        var credentials = $cookieStore.get('observer-credentials');
        console.log("setAuthorization:", credentials);

        if (credentials) {
            $http.defaults.headers.common.Authorization = credentials
        }
    };

    var checkSession = function (event, next, current) {
        console.log("checkSession > ", next);

        if (next.$$route && next.$$route.secure) {
            if (!$cookieStore.get('observer-credentials')) {
                console.log("here!");
                event.preventDefault();
                $rootScope.$evalAsync(function() {
                    $location.path('/login');
                });
            }
        }
    };

    


    $rootScope.$on("$routeChangeStart", checkSession);
    
    setAuthorization();

    return {
        check: checkSession,
        setAuthorization : setAuthorization
    };
}]);