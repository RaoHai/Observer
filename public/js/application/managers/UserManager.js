angular.module('userMgr', [])
    .factory('userMgr', ['$cookieStore', function($cookieStore) {
        var userMgr = {};

        var user = {};

        var setUser = function (json) {
            json.active = true;
            angular.extend(userMgr.user, json);
        };

        var updateLoggedUser = function (updatedUser) {
            user.username = updatedUser.username;
            user.role = updatedUser.role;
        };

        if ($cookieStore && $cookieStore.get('observer-user')) {
            setUser($cookieStore.get('observer-user'));
        }

        angular.extend(userMgr, {
            //properties
            user : user,
            //methods
            setUser: setUser,
            updateLoggedUser: updateLoggedUser
        });

        return userMgr;
}]);