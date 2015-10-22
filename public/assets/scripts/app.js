(function () {
    'use strict';

    var app = angular.module('cSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'ngBootbox']);

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
            .when('/accounts/list', {
                templateUrl: '/assets/partials/accounts-list.html',
                controller: 'AccountCtrl'
            })
            .when('/accounts/edit/:id', {
                templateUrl: '/assets/partials/edit_accounts.html',
                controller: 'AccountCtrl'
            })
            .when('/reports/list', {
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
            .when('/agency/edit', {
                templateUrl: '/assets/partials/edit_agency.html',
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
                if ($rootScope.user.accountType == 1) {
                    loginRedirectionProperties.setPath('admin');
                    //$scope.$emit('menuItem', '/assets/json/admin_menu.json');
                    $cookies.put('menuItem', '/assets/json/admin_menu.json', {'expires': expireDate});

                }
                else if ($rootScope.user.accountType == 2) {
                    loginRedirectionProperties.setPath('operator');
                    $cookies.put('menuItem', '/assets/json/operator_menu.json', {'expires': expireDate});
                }
                else {
                    loginRedirectionProperties.setPath('agency');
                    //set own json menu
                }

                //console.log($rootScope.auth);
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

    app.controller('AdminCtrl', function($scope, $http, $rootScope, $location, $route, listAcc){

        $scope.lAgency = function () {
            var url = '//api.ssad.localhost/agency/list';
            $http.get(url).success(function(data) {
                $scope.agencies = data;
            });
        };

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
                }).success(function (data) {
                    console.log(data);
                    $scope.name = '';
                    $scope.add = '';
                    $scope.tel = '';
                });
            }
        };

        $scope.fAgency = function (data) {
            $rootScope.editAgenID = data;
            $location.path('/agency/edit');
        };

        $scope.pAgency = function () {
            var url = "//api.ssad.localhost/agency/populate";
            $http.post(url, {
                'id': $rootScope.editAgenID}).success(function (data) {
                $scope.ename=data.agencyName;
                $scope.eadd=data.agencyAddress;
                $scope.etel=data.agencyTel;
            });
        }

        $scope.eAgency = function () {
            var url = "//api.ssad.localhost/agency/edit";
            if (!$scope.ename)
            {
                alert("Enter Name");
            }
            else if (!$scope.eadd)
            {
                alert("Enter Address");
            }
            else if (!$scope.etel)
            {
                alert("Enter Tel");
            }
            else {
                $http.post(url, {
                    'id': $rootScope.editAgenID,
                    'name': $scope.ename,
                    'add': $scope.eadd,
                    'tel': $scope.etel
                }).success(function (data) {
                    console.log(data);
                    $location.path('/agency/list');
                });
            }
        };

        $scope.dAgency = function (data) {
            var url = "//api.ssad.localhost/agency/delete";
            $http.post(url, {
                'id': data
            }).success(function (data) {
                console.log(data);
                $route.reload();
            });
        };

        $scope.lReport = function () {
            var url = '//api.ssad.localhost/report/list';
            $http.get(url).success(function(data) {
                $scope.reports = data;
            });
        };
    });

    app.controller('AccountCtrl', function($scope, $http, $rootScope, $parse, $timeout, $location, listAcc, listAgency, Account){
        $scope.accounts = {};
        $scope.filter = {};
        $scope.l_accounts = {};
        $scope.e_account = {};
        $scope.sort_index = {
            'id': false,
            'username': false,
            'email': false,
            'accountTypeName': false,
            'agencyName': false,
            'created_at': false,
            'updated_at': false
        };

        listAcc().success(function (data) {
            $scope.accountTypes = data;
        });

        listAgency().success(function (data) {
            $scope.agencies = data;
        });


        $scope.accounts.type = 1;

        $scope.checkAg = function (id) {
            if (id == 3)
                $scope.c_agency = true;
            else
                $scope.c_agency = false;
        };

        $scope.validate =  function(name, field){

            //if(field === 'accounts') {
            //    console.log('inside here account');
            //    $scope.fields = $scope.accounts;
            //}
            //else {
            //    console.log('inside here e_account');
            //    $scope.field = $scope.e_account;
            //}
            Account.validate({'name': name}, $scope.accounts).$promise.then(function(xhrResult){
                var model = $parse(name +'.error');
                model.assign($scope, null);
            },function(error){
                var model = $parse(name +'.error');
                model.assign($scope, error.data.error.message);
            });
        };

        $scope.createAcc = function(){
            if($scope.username.error == null && $scope.password.error == null && $scope.email.error == null){
                $scope.acc_create = true;
                Account.create({}, $scope.accounts).$promise.then(function(xhrResult){
                    $scope.success = xhrResult.message;
                    if ($scope.success){
                        $timeout(function(){
                            toastr.success($scope.success);
                            $scope.accounts = {};
                            $scope.accounts.type = 1;
                            $scope.c_agency = false;
                            $scope.acc_create = false;
                            $scope.success = null;
                        }, 1000);
                    }
                },function(error){
                    //if(error.data.error.code == 425)
                    //    toastr.warning(error.data.error.message)
                    //else
                    toastr.error(error.data.error.message);
                    $scope.acc_create = false;
                });
            }
        };

        $scope.resetFilter = function() {
            $scope.filter = {};
            $scope.l_accounts.$resolved = false;
            $timeout(function(){
                $scope.loadAccounts();
            }, 1500);
        };

        $scope.loadAccounts = function() {
            $scope.filter.page = $scope.l_accounts.current_page;
            $scope.l_accounts = Account.get($scope.filter);
        };

        $scope.loadAccounts();

        $scope.pageChanged = function () {
            $scope.l_accounts.$resolved = false;
            $timeout(function(){
                $scope.loadAccounts();
            }, 1500);

        };

        $scope.searchAccounts = function () {
            $scope.l_accounts.$resolved = false;
            $scope.l_accounts.current_page = 1;
            $timeout(function(){
                $scope.loadAccounts();
            }, 1500);
        };

        $scope.sort = function (index) {
            switch (index) {
                case 'id':
                    $scope.sort_index.id = !$scope.sort_index.id;
                    console.log($scope.sort_index.id);
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.id) ? 'desc' : 'asc';
                    break;
                case 'username':
                    $scope.sort_index.username = !$scope.sort_index.username;
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.username) ? 'desc' : 'asc';
                    break;
                case 'email':
                    $scope.sort_index.email = !$scope.sort_index.email;
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.email) ? 'desc' : 'asc';
                    break;
                case 'accountTypeName':
                    $scope.sort_index.accountTypeName = !$scope.sort_index.accountTypeName;
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.accountTypeName) ? 'desc' : 'asc';
                    break;
                case 'agencyName':
                    $scope.sort_index.agencyName = !$scope.sort_index.agencyName;
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.agencyName) ? 'desc' : 'asc';
                    break;
                case 'created_at':
                    $scope.sort_index.created_at = !$scope.sort_index.created_at;
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.created_at) ? 'desc' : 'asc';
                    break;
                case 'updated_at':
                    $scope.sort_index.updated_at = !$scope.sort_index.updated_at;
                    $scope.filter.order_by = index;
                    $scope.filter.order_dir = ($scope.sort_index.updated_at) ? 'desc' : 'asc';
                    break;
            }

            $scope.l_accounts.$resolved = false;
            $scope.l_accounts.current_page = 1;
            $timeout(function(){
                $scope.loadAccounts();
            }, 1500);
        };

        $scope.loadEdit = function(){
            $scope.url_list = $location.path().split('/');
            var id = $scope.url_list[$scope.url_list.length-1];
            console.log(id);
            Account.get({'id': id}).$promise.then(function(data){
                $scope.e_account = data;
            },function(error){
                toastr.error(error.data.error.message);

            });
        };

        $scope.updateAcc = function(){
            var id = $scope.url_list[$scope.url_list.length-1];
            $scope.acc_update = true;
            Account.save({'id': id}, $scope.e_account).$promise.then(function(xhrResult){
                $scope.success = xhrResult.message;
                if ($scope.success){
                    $timeout(function(){
                        toastr.success($scope.success);
                        $scope.acc_update = false;
                        $scope.success = null;
                        $location.path('/accounts/list');
                    }, 1000);
                }
            },function(error){
                if(error.data.error.code == 425)
                    toastr.warning(error.data.error.message)
                else
                    toastr.error(error.data.error.message);
                $scope.acc_update = false;
            });

        };

        $scope.deleteAcc = function (id) {
            bootbox.confirm("Are you sure you want to delete this?", function (result) {
                if (result) {
                    Account.remove({
                        'id': id
                    }).$promise.then(function (xhrResult) {
                            $scope.success = xhrResult.message;
                            $scope.loadAccounts();
                            toastr.success($scope.success);
                        }
                    );
                }
            });
        };

        $scope.accountResetPass = function(id, user, type) {
            var new_pass = type.toLowerCase();
            bootbox.confirm("Are you sure you want to reset this account - " + user + ' (' + type + ')', function (result) {
                if (result) {
                    Account.reset({
                        'id': id
                    }, {'pass': new_pass}).$promise.then(function (xhrResult) {
                            $scope.success = xhrResult.message;
                            toastr.success($scope.success);
                        }
                    );
                }
            });
        };


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
                promise = $http.get($rootScope.menuItem);

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

    app.factory('Activities', function($http){
        return function() {
            var promise = $http.get(api_url + '/getActivities');
            return promise;
        }
    });


    app.factory('Account', ['$resource', function ($resource) {
        return $resource(api_url + '/account/:id', {
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
                    method: "PUT",
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
                },
                'reset': {
                    method: "POST",
                    url: api_url + '/account/resetpass/:id',
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
