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
            .when('/accounts/create', {
                templateUrl: '/assets/partials/create_accounts.html',
                controller: 'AccountCtrl'
            })
            .when('/reports', {
                templateUrl: '/assets/partials/admin_report.html',
                controller: 'AdminCtrl'
            })
            .when('/agency/add', {
                templateUrl: '/assets/partials/create_agency.html',
                controller: 'AdminCtrl'
            })
            .when('/agency/list', {
                templateUrl: '/assets/partials/list_agency.html',
                controller: 'AdminCtrl'
            })
            .when('/operator', {
                templateUrl: '/assets/partials/operator.html',
                controller: 'OperatorCtrl'
            })
            .when('/create_report', {
                templateUrl: '/assets/partials/create_report.html',
                controller: 'OperatorCtrl'
            })
            .when('/manage_incident', {
                templateUrl: '/assets/partials/manage_incident.html',
                controller: 'OperatorCtrl'
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

            //$rootScope.auth = Auth.get();

            //$rootScope.user = $cookies.getObject('user');
            $rootScope.menuItem = $cookies.get('menuItem');


            $rootScope.homeUrl = function (url) {
                if (url.charAt(0) !== '/') {
                    url = '/' + url;
                }

                return url;
            };

            //$rootScope.authLogout = function () {
            //    $scope.loggin_out = true;
            //    Auth.logout().$promise.then(function (xhrResult) {
            //        $cookies.remove('user');
            //        $cookies.remove('menuItem');
            //        window.location.href = $rootScope.homeUrl('login');
            //    });
            //};
        }
    ]);

    app.controller('DashboardCtrl', [
        '$scope', '$http', '$location', '$rootScope', '$routeParams', '$timeout', '$cookies', 'Auth',
        function ($scope, $http, $location, $rootScope, $routeParams, $timeout, $cookies, Auth) {
            Auth.get().$promise.then(function (xhrResult){
                $rootScope.auth = xhrResult;
                console.log($rootScope.auth);
            },function(error){
                window.location.href = $rootScope.homeUrl('login');
            });

            //$rootScope.auth = Auth.get();

            //$rootScope.user = $cookies.getObject('user');
            $rootScope.menuItem = $cookies.get('menuItem');


            $rootScope.homeUrl = function (url) {
                if (url.charAt(0) !== '/') {
                    url = '/' + url;
                }

                return url;
            };

            $rootScope.authLogout = function () {
                $scope.loggin_out = true;
                Auth.logout().$promise.then(function (xhrResult) {
                    $cookies.remove('user');
                    $cookies.remove('menuItem');
                    window.location.href = $rootScope.homeUrl('login');
                });
            };
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
                    $cookies.put('menuItem', '/assets/json/operator_menu.json', {'expires': expireDate});
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
                            window.location.href = $rootScope.homeUrl('operator');
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

    app.controller('AdminCtrl', function($scope, $http, $rootScope, listAcc){
        var url = '//api.ssad.localhost/agency/list';
        $http.get(url).success(function(data,status,headers,config) {
            $scope.agencies = data;
        });

        $scope.cAgency = function () {
            var url = "//api.ssad.localhost/agency/create";
            if (!$scope.name)
            {
                alert("Enter Name");
            }
            else if (!$scope.add)
            {
                alert("Enter Address");
            }
            else if (!$scope.tel) {
                alert("Enter Tel");
            }
            else {
                $http.post(url, {
                    'name': $scope.name,
                    'add': $scope.add,
                    'tel': $scope.tel
                }).success(function (data, status, headers, config) {
                    console.log("");
                });
            }
        };
    });

    app.controller('AccountCtrl', function($scope, $http, $rootScope, $parse, listAcc, listAgency, Account){
        $scope.accounts = {};

        listAcc().success(function (data) {
            $scope.accountTypes = data;
        });

        listAgency().success(function (data) {
            $scope.agencies = data;
        });


        $scope.accounts.type = 0;

        $scope.checkAg = function (id) {
            if (id == 2)
                $scope.c_agency = true;
            else
                $scope.c_agency = false;
        };

        $scope.validate =  function(name){
            Account.validate({'name': name}, $scope.accounts).$promise.then(function(xhrResult){
                var model = $parse(name +'.error');
                model.assign($scope, null);
            },function(error){
                var model = $parse(name +'.error');
                model.assign($scope, error.data.error.message);
            });
        }

        $scope.createAcc = function(){
            Account.create({}, $scope.accounts).$promise.then(function(xhrResult){
                toastr.success(xhrResult.message);
                $scope.accounts = {};
            },function(error){
                toastr.error(error.data.error.message);
            });
        }
    });

    app.controller('OperatorCtrl', function($scope, $http, $rootScope, Auth){
        //$scope.message ='testing';
        $scope.insertdata = function(){
            $http.post("/assets/scripts/postReportData.php",{'location':$scope.location,'type':$scope.type, 'datetime':$scope.datetime, 'report':$scope.report, 'contact':$scope.contact})
                .success(function(data,status,headers,config){
                    console.log("Data Inserted successfully!")
                });
        }
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


    app.factory('Auth', ['$resource', function($resource){
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

    app.factory('listAcc', function($http){
        return function() {
            var promise = $http.get(api_url + '/getAccount_T');
            return promise;
        }
    });

    app.factory('listAgency', function($http){
        return function() {
            var promise = $http.get(api_url + '/listAgencies');
            return promise;
        }
    });


    app.factory('Account', ['$resource', function ($resource) {
        return $resource(api_url + '/account', {
                id: '@id',
                name: '@name'
            },
            {
                'get': {
                    method: "GET",
                    withCredentials: true,
                    params: {}
                },
                'save': {
                    method: "POST",
                    url: api_url + '/account/:id',
                    withCredentials: true,
                    params: {}
                },
                'remove': {
                    method: "DELETE",
                    url: api_url + '/account/:id',
                    withCredentials: true,
                    params: {}
                },
                'create': {
                    method: "POST",
                    url: api_url + '/account',
                    withCredentials: true,
                    params: {}
                },
                'validate': {
                    method: "POST",
                    url: api_url + '/account/validate/:name',
                    withCredentials: true,
                    params: {}
                }
            });
    }]);






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
