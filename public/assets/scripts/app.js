(function () {
    'use strict';

    var app = angular.module('cSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'ngBootbox', "ng-fusioncharts"]);

    app.config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/assets/partials/login.html',
                controller: 'LoginCtrl'
            })
            .when('/user/profile', {
                templateUrl: '/assets/partials/user_profile.html',
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
            .when('/operator/create_report', {
                templateUrl: '/assets/partials/create_report.html',
                controller: 'OperatorCtrl'
            })
            .when('/operator/manage_report', {
                templateUrl: '/assets/partials/manage_report.html',
                controller: 'OperatorCtrl'
            })
            .when('/report/edit/:id', {
                templateUrl: '/assets/partials/update_report.html',
                controller: 'OperatorCtrl'
            })

            .when('/report/edit/:id', {
                templateUrl: '/assets/partials/update_report.html',
                controller: 'OperatorCtrl'
            })
            .when('/agency', {
                templateUrl: '/assets/partials/agency.html',
                controller: 'AgencyCtrl'
            })
            .when('/agency/manage_report', {
                templateUrl: '/assets/partials/manage_report_agency.html',
                controller: 'AgencyCtrl'
            })
            .when('/report/update/:id', {
                templateUrl: '/assets/partials/update_report_agency.html',
                controller: 'AgencyCtrl'
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


    app.controller('LoginCtrl', function($scope, $http, $rootScope, $timeout, $location, $cookies, Auth, loginRedirectionProperties, $route){
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
                    $cookies.put('menuItem', '/assets/json/agency_menu.json', {'expires': expireDate});
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
                            window.location.href = $rootScope.homeUrl('agency');
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

        $scope.changePass = function () {
            var url = "//api.ssad.localhost/user/changepass";
            $http.post(url, {
                'id': ($cookies.getObject('user')).id,
                'old_password': $scope.upopass,
                'new_password': $scope.upnpass
            }).success(function (data) {
                console.log(data);
                $timeout(function(){
                    toastr.success(data);
                }, 1000);
                $route.reload();
            }).error(function(data) {
                console.log(data);
                $scope.perrors = data;
            });
        };

        $scope.pUserProfile = function () {
            var url = "//api.ssad.localhost/user/populate";
            $http.post(url, {
                'id': ($cookies.getObject('user')).id
            }).success(function (data) {
                $scope.upusername=data.username;
                $scope.upacctype=data.accountType;
                $scope.upagency=data.agencyId;
                $scope.upemail=data.email;
            });
        };

        $scope.eUserProfile = function () {
            var url = "//api.ssad.localhost/user/edit";
            $http.post(url, {
                'id': ($cookies.getObject('user')).id,
                'email': $scope.upemail
            }).success(function (data) {
                console.log(data);
                $timeout(function(){
                    toastr.success(data);
                }, 1000);
                $route.reload();
            }).error(function(data) {
                console.log(data);
                $scope.errors = data;
            });
        };
    });

    app.controller('AdminCtrl', function($scope, $http, $rootScope, $location, $route, $timeout, Analytics){

        $scope.accDataSource = {
            chart: {
                caption: "Accounts created",
                subCaption: "over 5 months",
                "bgColor": "#DDDDDD",
                "bgAlpha": "50",
                theme: "ocean"
            },
            data: []
        };


        $scope.acctypeDataSource = {
            chart: {
                caption: "Number of account types",
                startingangle: "120",
                showlabels: "0",
                showlegend: "1",
                enablemultislicing: "0",
                slicingdistance: "15",
                showpercentvalues: "1",
                showpercentintooltip: "1",
                plottooltext: "Number of $label: $datavalue",
                "bgColor": "#DDDDDD",
                "bgAlpha": "50",
                theme: "fint"
            },
            data: []
        };


        $scope.agDataSource = {
            chart: {
                caption: "Agencies created",
                subCaption: "over 5 months",
                "bgColor": "#DDDDDD",
                "bgAlpha": "50",
                theme: "zune"
            },
            data: []
        };

        $scope.reportDataSource = {
            chart: {
                caption: "Reports made",
                subCaption: "over 5 months",
                "bgColor": "#DDDDDD",
                "bgAlpha": "50",
                theme: "carbon"
            },
            data: []
        };



        $scope.getAccAnalytics = function(){
            Analytics.account().$promise.then(function(xhrResult){
                $scope.analytics_acc = xhrResult;
                $scope.accDataSource.data = $scope.analytics_acc.past_months;
                $scope.acctypeDataSource.data = $scope.analytics_acc.total_acctype;
            });
        };

        $scope.getAgAnalytics = function(){
            Analytics.agency().$promise.then(function(xhrResult){
                $scope.analytics_ag = xhrResult;
                $scope.agDataSource.data = $scope.analytics_ag.past_months;
            });
        };




        $scope.getAccAnalytics();
        $scope.getAgAnalytics();




        $scope.lAgency = function () {
            var url = '//api.ssad.localhost/agency/list';
            $http.get(url).success(function(data) {
                $scope.agencies = data;
            });
        };

        $scope.cAgency = function () {
            var url = "//api.ssad.localhost/agency/create";
            $http.post(url, {
                'name': $scope.name,
                'address': $scope.add,
                'tel_no': $scope.tel
            }).success(function (data) {
                console.log(data);
                $timeout(function(){
                    toastr.success(data);
                    $scope.name = '';
                    $scope.add = '';
                    $scope.tel = '';
                }, 1000);
                $route.reload();
            }).error(function(data) {
                console.log(data);
                $scope.errors = data;
            });
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
            $http.post(url, {
                'id': $rootScope.editAgenID,
                'name': $scope.ename,
                'address': $scope.eadd,
                'tel_no': $scope.etel
            }).success(function (data) {
                console.log(data);
                $timeout(function(){
                    toastr.success(data);
                }, 1000);
                $location.path('/agency/list');
            }).error(function(data) {
                console.log(data);
                $scope.errors = data;
            });
        };

        $scope.dAgency = function (data) {
            var url = "//api.ssad.localhost/agency/delete";
            $http.post(url, {
                'id': data
            }).success(function (data) {
                console.log(data);
                $timeout(function(){
                    toastr.success(data);
                }, 1000);
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
                    toastr.warning(error.data.error.message);
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

    app.controller('OperatorCtrl', function($scope, $http, $rootScope, $location, Auth){
        $scope.listReports = function () {
            var url = '//api.ssad.localhost/report/list';
            $http.get(url).success(function (data, status, headers, config) {
                $scope.reportList = data;
                console.log($scope.reportList);
            });
        }

        $scope.retrieveAgency = function () {
            var url = '//api.ssad.localhost/agency/list';
            $http.get(url).success(function (data, status, headers, config) {
                $scope.agencyList = data;
                console.log($scope.agencyList);
            });
        }
        $scope.createReport = function () {
            var url = "//api.ssad.localhost/report/create";
            if (!$scope.reportName) {
                alert("Enter Name");
            }
            else if (!$scope.location) {
                alert("Enter location");
            }
            else if (!$scope.reportType) {
                alert("Enter Report Type");
            }
            else if (!$scope.reportedBy) {
                alert("Enter name of the reporter");
            }
            else if (!$scope.contactNo) {
                alert("Enter contact No of the reporter");
            }
            else if (!$scope.assignedTo) {
                alert("Enter a agency");
            }
            else {
                $http.post(url, {
                    'reportName': $scope.reportName,
                    'location': $scope.location,
                    'reportType': $scope.reportType,
                    'reportedBy': $scope.reportedBy,
                    'contactNo': $scope.contactNo,
                    'assignedTo': $scope.assignedTo
                }).success(function (data, status, headers, config) {
                    console.log("Data inserted successfully");
                    toastr.success('Report Created.');
                });
            }

        }
            $scope.deleteReport = function ($reportID){
                var url = "//api.ssad.localhost/report/delete";
                bootbox.confirm("Are you sure you want to delete this report?", function (result) {
                if (result) {
                    $http.post(url, {
                        'reportID': $reportID
                    }).success(function (data, status, headers, config) {
                        console.log("Report deleted successfully");
                        location.reload();
                        //toastr.success('Report Deleted.');

                    });
                    }
                })
            }

            $scope.findReport = function ($reportID) {
                $rootScope.operatorReportID = $reportID;
                $location.url('/report/edit/' + $reportID);
            };

            $scope.populateReport = function (){
                var url = '//api.ssad.localhost/agency/list';
                $http.get(url).success(function (data, status, headers, config) {
                    $scope.agencyList = data;
                    console.log($scope.agencyList);
                });

                var url2 = "//api.ssad.localhost/report/populate";
                    $http.post(url2, {
                        'reportID': $rootScope.operatorReportID
                    }).success(function (data, status, headers, config) {
                        console.log("Report data populated successfully");
                        $scope.reportID=data.reportID;
                        $scope.reportType=data.reportType;
                        $scope.reportName=data.reportName;
                        $scope.reportedBy=data.reportedBy;
                        $scope.contactNo=data.contactNo;
                        $scope.location=data.location;
                        $scope.assignedTo=data.assignedTo;
                    })
            }

        $scope.updateReport = function () {
            var url = "//api.ssad.localhost/report/update";
            if (!$scope.reportName) {
                alert("Enter Name");
            }
            else if (!$scope.location) {
                alert("Enter location");
            }
            else if (!$scope.reportType) {
                alert("Enter Report Type");
            }
            else if (!$scope.reportedBy) {
                alert("Enter name of the reporter");
            }
            else if (!$scope.contactNo) {
                alert("Enter contact No of the reporter");
            }
            else if (!$scope.assignedTo) {
                alert("Enter a agency");
            }
            else {
                $http.post(url, {
                    'reportID': $rootScope.operatorReportID,
                    'reportName': $scope.reportName,
                    'location': $scope.location,
                    'reportType': $scope.reportType,
                    'reportedBy': $scope.reportedBy,
                    'contactNo': $scope.contactNo,
                    'assignedTo': $scope.assignedTo
                }).success(function (data, status, headers, config) {
                    console.log("Report updated successfully");
                    toastr.success('Report Updated.');
                    $location.path('/operator/manage_report')
                });
            }

        }

    });

    app.controller('AgencyCtrl', function($scope, $http, $rootScope, $location, $filter){
        $scope.listReports = function () {
            var url = '//api.ssad.localhost/report/list';
            $http.get(url).success(function (data, status, headers, config) {
                $scope.reportList = data
            });

            var url2 = '//api.ssad.localhost/agency/list';
            $http.get(url2).success(function (data, status, headers, config) {
                $scope.agencyList = data;

                //find the current agency
                $scope.currentAgencyId = $rootScope.auth.agencyId;
                console.log($scope.currentAgencyId);
                $scope.currentAgencyName = $scope.agencyList[$scope.currentAgencyId-1].agencyName;
                console.log($scope.currentAgencyName);
            });


        }

        $scope.findReport = function ($reportID) {
            $rootScope.AgencyReportID = $reportID;
            $location.url('/report/update/' + $reportID);
        };

        $scope.dropBoxSelected = function ($status) {
            $rootScope.AgencyReportStatus = $status;
            console.log($rootScope.AgencyReportStatus);
        };

        $scope.populateReport = function (){
            var url = "//api.ssad.localhost/report/populate";
            $http.post(url, {
                'reportID': $rootScope.AgencyReportID
            }).success(function (data, status, headers, config) {
                console.log("Report data populated successfully");
                $scope.reportID=data.reportID;
                $scope.reportType=data.reportType;
                $scope.reportName=data.reportName;
                $scope.reportedBy=data.reportedBy;
                $scope.contactNo=data.contactNo;
                $scope.location=data.location;
                $scope.status=data.status;
                $scope.comment=data.comment;
            })
        }
        $scope.updateReport = function () {
            var url = "//api.ssad.localhost/report/updateStatus";
                $http.post(url, {
                    'reportID': $rootScope.AgencyReportID,
                    'status': $scope.status,
                    'comment': $scope.comment
                }).success(function (data, status, headers, config) {
                    console.log("Report updated successfully");
                    toastr.success('Report Updated.');
                    $location.path('/agency/manage_report')
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

    app.factory('Analytics', ['$resource', function ($resource) {
        return $resource(api_url + '/getAnalytics', {

        },{
            'account': {
                url: api_url + '/getAnalytics/accounts',
                method: 'GET',
                withCredentials: true
            },
            'agency': {
                url: api_url + '/getAnalytics/agencies',
                method: 'GET',
                withCredentials: true
            },
            'report': {
                url: api_url + '/getAnalytics/reports',
                method: 'GET',
                withCredentials: true
            }
        });
    }]);


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
