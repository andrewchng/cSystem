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
            .when('/reports', {
                templateUrl: '/assets/partials/admin_report.html',
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

    //app.run(function($rootScope){
    //    $rootScope.menuItem = '/assets/json/admin_menu.json';
    //});

    app.controller('AppCtrl', [
        '$scope', '$http', '$location', '$rootScope', '$routeParams', '$timeout', '$cookies', 'Auth',
        function ($scope, $http, $location, $rootScope, $routeParams, $timeout, $cookies, Auth) {
            $rootScope.auth = Auth.get();
            $rootScope.user = $cookies.getObject('user');
            $rootScope.menuItem = $cookies.get('menuItem');


            $rootScope.homeUrl = function (url) {
                if (url.charAt(0) !== '/') {
                    url = '/' + url;
                }

                return url;
            };

            //$scope.$on('menuItem', function (event, data) {
            //    console.log('emitted up ' + data); // 'Some data'
            //});


        }
    ]);

    app.controller('LoginCtrl', function($scope, $http, $rootScope, $timeout, $location, $cookies, Auth, loginRedirectionProperties){
        jQuery("input[name='username']").focus();

        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        $scope.authLogin = function () {
            $scope.logging_in = true;
            if($scope.auth_error){
                delete $scope.auth_error;
            }
            Auth.login({}, $scope.field_login).$promise.then(function(xhrResult) {
                $rootScope.auth = xhrResult;
                $rootScope.user = xhrResult;
                $cookies.putObject('user', $rootScope.user, {'expires': expireDate});
                if ($rootScope.user.accountType == 0) {
                    loginRedirectionProperties.setPath('admin');
                    //$scope.$emit('menuItem', '/assets/json/admin_menu.json');
                    $cookies.put('menuItem', '/assets/json/admin_menu.json', {'expires': expireDate});

                }
                else if ($rootScope.user.accountType == 1) {
                    loginRedirectionProperties.setPath('operator');
                    //set own json menu
                }
                else {
                    loginRedirectionProperties.setPath('agency');
                    //set own json menu
                }

                console.log($rootScope.auth);
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
                            window.location.href = $rootScope.homeUrl('admin');
                            break;
                        default:
                            break;
                    }
                }, 1000);
            }
        });


    });

    app.controller('AdminCtrl', function($scope, $http, $rootScope, Auth){

    });

    app.controller('SidebarCtrl', function($scope, $http, $location, $rootScope, $timeout, retrieveMenu){
        //console.log($rootScope.menuItem);
        retrieveMenu().success(function(data){
            $scope.sidebarMenuList = data.menu_list;
            $scope.title = data.board;
        });

        $scope.isActiveMenuItem = function (menu) {
            if (!menu.submenu) {
                return $location.path().indexOf(menu.href) === 0;
            } else {
                return menu.submenu.reduce(function(previousValue, currentValue, index, array) {
                    if (previousValue) {
                        return previousValue;
                    }
                    return $scope.isActiveMenuItem(currentValue);
                }, false);
            }
        };

        $scope.setDisplaySubMenus = function () {
            if($scope.class == "open")
                $scope.class = "";
            else
                $scope.class = "open";
            //console.log(menu.target);
            //var html = menu.target;
            ////console.log(jQuery(html).children('.title'));
            //var toFind = jQuery(html).text();
            ////jQuery(html)
            ////console.log(jQuery(html).closest());
            //console.log(toFind);
            //jQuery(html).closest().addClass('open');
            //jQuery('.page-sidebar-menu > li:has(ul)').each(function () {
            //    console.log(jQuery(this).children('.title'));
            //    if (toFind == jQuery(this).children('.title').text()) {
            //        console.log('found');
            //        if (!jQuery(this).hasClass('open')) {
            //            jQuery(this).addClass('open');
            //        }
            //        else
            //            jQuery(this).removeClass('open');
            //    }
            //});

        };

        $scope.displaySubMenus = function() {
            console.log($scope.class == "open");
            if($scope.class == "open")
                return true;
            else
                return false;
        }



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
                    url: api_url + '/auth/login',
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

    app.factory('retrieveMenu', function($http, $rootScope){
        var promise = null;

        return function () {
            if (promise) {
                // If we've already asked for this data once,
                // return the promise that already exists.
                return promise;
            } else {
                //console.log($rootScope.menuItem);
                promise = $http.get($rootScope.menuItem);
                //console.log(promise);
                return promise;
            }
        }
    });


}());
(function(){
    'use strict';

    var app = angular.module('cSystem');

    app.service('loginRedirectionProperties', function () {
        var path = '';

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
