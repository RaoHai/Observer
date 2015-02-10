angular.module('modalManager', [])
.factory('modalManager', ['$rootScope', function ($rootScope) {
    var self = this;

    $rootScope.openModal = function (size) {

        self.$modalInstance = $modal.open({
            templateUrl: 'templates/projectCreationModal.html',
            size: size
        });

        self.$modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $rootScope.cancel = function () {
        console.log("cancel:");
        self.$modalInstance.dismiss('cancel');
    };


}]);