(function () {
    'use strict';

    var app = angular.module('cSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCookies']);

    app.config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/assets/partials/login.html',
                controller: 'LoginCtrl'
            })

        $locationProvider.html5Mode(true);
    });

    app.controller('AppCtrl', [
        '$scope', '$http', '$location', '$rootScope', '$routeParams', '$timeout',
        function ($scope, $http, $location, $rootScope, $routeParams, $timeout) {

        }
    ]);

    app.controller('LoginCtrl', function($scope, $http, $rootScope, $routeParams, $timeout){
        $scope.authLogin = function () {
            $scope.logging_in = true;
        }
    });




}());