angular.module('userMgr', [])
    .factory('userMgr', [function() {
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




        angular.extend(userMgr, {
            //properties
            user : user,
            //methods
            setUser: setUser,
            updateLoggedUser: updateLoggedUser
        });

        return userMgr;
}]);