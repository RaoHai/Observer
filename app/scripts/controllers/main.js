'use strict';

/**
 * @ngdoc function
 * @name observerDevApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the observerDevApp
 */
angular.module('observerDevApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
