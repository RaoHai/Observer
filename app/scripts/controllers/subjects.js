/*global $*/
'use strict';
/**
 * @ngdoc function
 * @name observerDevApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('observerDevApp')
  .controller('SubjectCtrl', function ($scope, fbutil, $timeout) {
    $scope.subjects = fbutil.syncArray('subjects');
    $scope.subjects.$loaded().catch(alert);


    $scope.addSubject = function () {
        $scope.subjects.$add($scope.newSubject).then(function () {  
            $scope.subjects.$loaded().catch(alert);
            $('subject-create').modal({
                show: false
            });
        })
        .catch(alert);
    };
    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });