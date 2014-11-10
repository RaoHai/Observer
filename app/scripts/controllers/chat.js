'use strict';
/**
 * @ngdoc function
 * @name observerDevApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('observerDevApp')
  .controller('ChatCtrl', function ($scope, fbutil, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = fbutil.syncArray('messages', {limit: 10});

    $scope.subjects = fbutil.syncArray('subjects');
    $scope.subjects.$loaded().catch(alert);
    // display any errors
    $scope.messages.$loaded().catch(alert);

    $scope.addSubject = function () {
      $scope.subjects.$add({
        'title' : 'baidu',
        'url' : 'www.baidu.com'
      }).catch(alert);
    };
    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
