(function () {
    'use strict';

    var app = angular.module('cSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCookies']);

    app.config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/assets/partials/login.html',
                controller: 'LoginCtrl'
            })
            .when('/admin', {
                templateUrl: '/assets/partials/admin.html',
                controller: 'AdminCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);



        // Whitelist domains
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            'http://api.ssad.localhost/**',
            'https://api.ssad.localhost/**'
        ]);


    });

    app.controller('AppCtrl', [
        '$scope', '$http', '$location', '$rootScope', '$routeParams', '$timeout', '$cookies',
        function ($scope, $http, $location, $rootScope, $routeParams, $timeout, $cookies) {
            //$rootScope.auth = Auth.get();


            $rootScope.homeUrl = function (url) {
                if (url.charAt(0) !== '/') {
                    url = '/' + url;
                }

                return url;
            };

            //if ($cookies.user == null)
            //    window.location.href = $rootScope.homeUrl('login');


        }
    ]);

    app.controller('LoginCtrl', function($scope, $http, $rootScope, $timeout, Auth, loginRedirectionProperties){
        jQuery("input[name='username']").focus();

        $scope.authLogin = function () {
            $scope.logging_in = true;
            if($scope.auth_error){
                delete $scope.auth_error;
            }
            Auth.login({}, $scope.field_login).$promise.then(function(xhrResult){
                $rootScope.auth = xhrResult;
                $rootScope.user = xhrResult;
                if($rootScope.user.accountType == 0)
                    loginRedirectionProperties.setPath('admin');
                else if($rootScope.user.accountType == 1)
                    loginRedirectionProperties.setPath('operator');
                else
                    loginRedirectionProperties.setPath('agency');

                $cookies.user = $rootScope.user.id;

                console.log(loginRedirectionProperties.getPath());
            },function(error){
                $scope.logging_in = false;
                $scope.auth_error = error.data.error.message;
            });
        }

        $rootScope.$watch('auth', function () {
            if ($rootScope.auth){
                $timeout(function(){
                    switch(loginRedirectionProperties.getPath()){
                        case 'operator':
                            break;
                        case 'agency':
                            break;
                        case 'admin':
                        default:
                            window.location.href = $rootScope.homeUrl('admin');
                            break;
                    }
                }, 1000);
            }
        });


    });

    app.controller('AdminCtrl', function($scope, $http, $rootScope, Auth){

    });




}());
(function () {
    'use strict';

    var app = angular.module('cSystem');
    var api_url = '//api.ssad.localhost';


    app.factory('Auth', ['$resource', function($resource, $rootScope){
        return $resource(api_url + '/auth', {
            frontend: true
        },{
                'get': {
                method: 'GET',
                withCredentials: true
                },
                'login': {
                    url: api_url + '/auth',
                    method: 'POST',
                    withCredentials: true
                },
                'logout': {
                    url: api_url + '/auth/logout',
                    method: 'GET',
                    withCredentials: true
                }
            });
    }]);



}());
(function(){
    'use strict';

    var app = angular.module('cSystem');

    app.service('loginRedirectionProperties', function () {
        var path = 'admin';

        return {
            getPath: function () {
                return path;
            },
            setPath: function(value) {
                path = value;
            }
        }
    })

})();
