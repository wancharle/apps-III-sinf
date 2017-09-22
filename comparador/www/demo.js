/* eslint no-alert: 0 */

'use strict';
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/comparar', {templateUrl: 'forms.html', reloadOnSearch: false});
  $routeProvider.when('/privacidade', {templateUrl: 'privacidade.html', reloadOnSearch: false});
});

//
app.controller('MainController', function($rootScope, $scope) {

  $scope.userAgent = navigator.userAgent;

  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });


  $scope.comparar = function() {
    alert('compare');
  };

});
