angular.module('modalManager', [])
.factory('modalManager', ['$rootScope', '$modal', function ($rootScope, $modal) {
    var self = this;

    $rootScope.openModal = function (options) {

        self.$modalInstance = $modal.open(options);

        self.$modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $rootScope.cancel = function () {
        console.log("cancel:");
        self.$modalInstance.dismiss('cancel');
    };

    return {

    };


}]);