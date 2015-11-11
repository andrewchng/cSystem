(function () {
    'use strict';

    var app = angular.module('cSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'ngBootbox', "ng-fusioncharts", 'ngScrollable']);


    var roles = {
        admin: 1,
        operator: 2,
        agency: 3
    };


    app.config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/assets/partials/login.html',
                controller: 'LoginCtrl'
            })
            .when('/user/profile', {
                templateUrl: '/assets/partials/user_profile.html',
                controller: 'LoginCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin, roles.operator, roles.agency]);
                    }
                }
            })
            .when('/admin', {
                templateUrl: '/assets/partials/admin.html',
                controller: 'AdminCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/accounts/create', {
                templateUrl: '/assets/partials/create_accounts.html',
                controller: 'AccountCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/accounts/list', {
                templateUrl: '/assets/partials/accounts-list.html',
                controller: 'AccountCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/accounts/edit/:id', {
                templateUrl: '/assets/partials/edit_accounts.html',
                controller: 'AccountCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/reports/list', {
                templateUrl: '/assets/partials/admin_report.html',
                controller: 'AdminCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/agency/add', {
                templateUrl: '/assets/partials/create_agency.html',
                controller: 'AdminCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/agency/list', {
                templateUrl: '/assets/partials/list_agency.html',
                controller: 'AdminCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/agency/edit', {
                templateUrl: '/assets/partials/edit_agency.html',
                controller: 'AdminCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/subscribers/list', {
                templateUrl: '/assets/partials/list_subscribers.html',
                controller: 'SubCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.admin]);
                    }
                }
            })
            .when('/operator/home', {
                templateUrl: '/assets/partials/operator.html',
                controller: 'OperatorCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.operator]);
                    }
                }
            })
            .when('/operator/create_report', {
                templateUrl: '/assets/partials/create_report.html',
                controller: 'OperatorCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.operator]);
                    }
                }
            })
            .when('/operator/manage_report', {
                templateUrl: '/assets/partials/manage_report.html',
                controller: 'OperatorCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.operator]);
                    }
                }
            })
            .when('/report/edit/:id', {
                templateUrl: '/assets/partials/update_report.html',
                controller: 'OperatorCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.operator]);
                    }
                }
            })

            .when('/report/edit/:id', {
                templateUrl: '/assets/partials/update_report.html',
                controller: 'OperatorCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.operator]);
                    }
                }
            })
            .when('/agency', {
                templateUrl: '/assets/partials/agency.html',
                controller: 'AgencyCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.agency]);
                    }
                }
            })
            .when('/agency/manage_report', {
                templateUrl: '/assets/partials/manage_report_agency.html',
                controller: 'AgencyCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.agency]);
                    }
                }
            })
            .when('/report/update/:id', {
                templateUrl: '/assets/partials/update_report_agency.html',
                controller: 'AgencyCtrl',
                resolve: {
                    permission: function(authorizationService, $route) {
                        return authorizationService.permissionCheck([roles.agency]);
                    }
                }
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

    app.controller('PublicCtrl', function($scope, $http, $location, $rootScope, $timeout, retrieveMenu){
        $scope.screenHeight = screen.height;
        $scope.listReports = function () {
            console.log("Called list report");
            var url = '//api.ssad.localhost/report/list';
            $http.get(url).success(function (data, status, headers, config) {
                $.each(data, function(e,v) {
                    if (v.reportTypeName == 'Dengue') {
                        v.icon = 'http://t1.onemap.sg/icons/DENGUE_CLUSTER/mosquitoa20.jpg'
                    } else if (v.reportTypeName == 'Traffic') {
                        v.icon = 'assets/styles/img/incident.png'
                    }
                    v.location = v.location.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                });

                $scope.reportList = data;
            });
        }
    });

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
            //Auth.get().$promise.then(function (xhrResult){
            //    $rootScope.auth = xhrResult;
            //    console.log($rootScope.auth);
            //},function(error){
            //    window.location.href = $rootScope.homeUrl('login');
            //});

            $rootScope.auth = Auth.get();

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


            },function(error){
                $scope.logging_in = false;
                $scope.auth_error = error.data.error.message;
            });
        };

        $rootScope.$watch('auth', function () {
            if ($rootScope.auth){
                $timeout(function(){
                    switch(loginRedirectionProperties.getPath()){
                        case 'operator':
                            window.location.href = $rootScope.homeUrl('operator/home');
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

                toastr.success(data);
                $route.reload();
            }).error(function(data) {

                toastr.warning(data.error.message);
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

                toastr.success(data);
                $route.reload();
            }).error(function(data) {

                toastr.warning(data.error.message);
            });
        };


        $scope.popForgetPass = function() {


            bootbox.dialog({
                    title: "Send Reset Password!",
                    message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="email">Email</label> ' +
                    '<div class="col-md-6"> ' +
                    '<input name="email" type="text" placeholder="Your email" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</form> </div> </div>'
                    ,
                    buttons: {
                        success: {
                            label: "Send",
                            className: "btn-success",
                            callback: function () {
                                $scope.f_email = $("input[name='email']").val();
                                console.log($scope.f_email);

                                $scope.forget_fields = {
                                    "email": $scope.f_email
                                }

                                Auth.forgetpass({}, $scope.forget_fields).$promise.then(function(xhrResult) {
                                    toastr.success('Successfully sent to your email.');
                                    //bootbox.hideAll();
                                },function(error){
                                    toastr.error(error.data.error.message);
                                });

                                return false;


                            }
                        }
                    }
                }
            );
        };


    });

    app.filter('pagination', function()
    {
        return function(input, start)
        {
            start = +start;
            return input.slice(start);
        };
    });

    app.controller('AdminCtrl', function($scope, $http, $rootScope, $location, $route, $timeout, Analytics){

        var d = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        $scope.months = new Array();

        for(var i=4; i>=0; i--){
            $scope.months.push(month[d.getMonth()-i]);
        }


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

        $scope.repDataSource = {
            "chart": {
                "caption": "No. of reports",
                "subCaption": "over 5 months",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "paletteColors": "#0075c2,#1aaf5d,#FF0066",
                "bgColor": "#DDDDDD",
                "showBorder": "0",
                "showShadow": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                "showAxisLines": "0",
                "showAlternateHGridColor": "0",
                "divlineThickness": "1",
                "divLineDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "xAxisName": "Month",
                "showValues": "0"
            },
            "categories": [
                {
                    "category": [
                        {"label":$scope.months[0]},{"label":$scope.months[1]},{"label":$scope.months[2]},{"label":$scope.months[3]},{"label":$scope.months[4]}
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "All Reports",
                    "data": [

                    ]
                },
                {
                    "seriesname": "Traffic Reports",
                    "data": [

                    ]
                },
                {
                    "seriesname": "Dengue Reports",
                    "data": [

                    ]
                }
            ]
        };



        $scope.repStatusDataSource = {
            "chart": {
                "caption": "Reports' status",
                "subCaption": "over 5 months",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "paletteColors": "#FF0000,#3366FF,#00FF33",
                "bgColor": "#DDDDDD",
                "showBorder": "0",
                "showShadow": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                "showAxisLines": "0",
                "showAlternateHGridColor": "0",
                "divlineAlpha": "100",
                "divlineColor": "#999999",
                "divlineThickness": "1",
                "divLineDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "xAxisName": "Month",
                "canvasBgColor": "#ffffff",
                "showValues": "0"
            },
            "categories": [
                {
                    "category": [
                        {"label":$scope.months[0]},{"label":$scope.months[1]},{"label":$scope.months[2]},{"label":$scope.months[3]},{"label":$scope.months[4]}
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "Pending",
                    "data": [

                    ]
                },
                {
                    "seriesname": "Ongoing",
                    "data": [

                    ]
                },
                {
                    "seriesname": "Resolved",
                    "data": [

                    ]
                }
            ]
        };


        $scope.subDataSource = {
            "chart": {
                "caption": "Total no. of subscribers",
                "subCaption": "over 5 months",
                "xAxisName": "Day",
                "yAxisName": "No. of subscribers",
                "lineThickness": "2",
                "paletteColors": "#0075c2",
                "baseFontColor": "#333333",
                "bgColor": "#DDDDDD",
                "baseFont": "Helvetica Neue,Arial",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "showBorder": "0",
                "showShadow": "0",
                "canvasBgColor": "#ffffff",
                "canvasBorderAlpha": "0",
                "divlineAlpha": "100",
                "divlineColor": "#999999",
                "divlineThickness": "1",
                "divLineDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "showXAxisLine": "1",
                "xAxisLineThickness": "1",
                "xAxisLineColor": "#999999",
                "showAlternateHGridColor": "0"
            },
            "data": [

            ]
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

        $scope.getRepAnalytics = function(){
            Analytics.reports().$promise.then(function(xhrResult){
                $scope.analytics_rep = xhrResult;
                $scope.repDataSource.dataset[0].data = $scope.analytics_rep.past_months;
                $scope.repDataSource.dataset[1].data = $scope.analytics_rep.t_past_months;
                $scope.repDataSource.dataset[2].data = $scope.analytics_rep.d_past_months;
                $scope.repStatusDataSource.dataset[0].data = $scope.analytics_rep.pendin;
                $scope.repStatusDataSource.dataset[1].data = $scope.analytics_rep.ongoing;
                $scope.repStatusDataSource.dataset[2].data = $scope.analytics_rep.resolved;

            });
        };

        $scope.getSubAnalytics = function(){
            Analytics.subscribers().$promise.then(function(xhrResult){
                $scope.analytics_sub = xhrResult;
                $scope.subDataSource.data = $scope.analytics_sub.past_months;
            });
        };



        $scope.getAccAnalytics();
        $scope.getAgAnalytics();
        $scope.getRepAnalytics();
        $scope.getSubAnalytics();

        // pagination
        $scope.curPage = 0;// current Page
        $scope.pageSize = 10;

        $scope.numberOfPages = function() {
            return Math.ceil($scope.agencies.length / $scope.pageSize);
        };

        $scope.lAgency = function () {
            $scope.agencies = [];
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

                toastr.success(data);
                $scope.name = '';
                $scope.add = '';
                $scope.tel = '';
                $route.reload();
            }).error(function(data) {

                toastr.warning(data.error.message);
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

                toastr.success(data);
                $location.path('/agency/list');
            }).error(function(data) {

                toastr.warning(data.error.message);
            });
        };

        $scope.dAgency = function (data) {
            var url = "//api.ssad.localhost/agency/delete";
            $http.post(url, {
                'id': data
            }).success(function (data) {

                toastr.success(data);
                $route.reload();
            }).error(function(data) {

                toastr.error("Cannot Delete Agency");
            });
        };

        $scope.rnumberOfPages = function() {
            return Math.ceil($scope.reports.length / $scope.pageSize);
        };

        $scope.lReport = function () {
            $scope.reports = [];
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
            Account.get({'id': id}).$promise.then(function(data){
                $scope.e_account = data;
                if($scope.e_account.agencyId)
                    $scope.c_agency = true;

            },function(error){
                toastr.error(error.data.error.message);

            });
        };

        $scope.updateAcc = function(){
            var id = $scope.url_list[$scope.url_list.length-1];
            $scope.acc_update = true;
            if($scope.c_agency == false){
                $scope.e_account.agencyId = null;
            }
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
                        },function(error){
                            toastr.error(error.data.error.message);
                        }
                    );
                }
            });
        };

        $scope.accountResetPass = function(id, user, type) {
            var new_pass = type.toLowerCase();
            bootbox.confirm("Are you sure you want to reset the password of this account - " + user + ' (' + type + ')', function (result) {
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

    app.controller('OperatorCtrl', function($scope, $http, $rootScope, $location, listReportT){
        $scope.listReports = function () {
            $scope.pending = 1;
            var url = '//api.ssad.localhost/report/listPending';
            $http.get(url).success(function (data, status, headers, config) {
                $scope.PreportList = data;
                $scope.PtotalItems = $scope.PreportList.length;
            });
            var url2 = '//api.ssad.localhost/report/listOngoing';
            $http.get(url2).success(function (data, status, headers, config) {
                $scope.OreportList = data;
                $scope.OtotalItems = $scope.OreportList.length;
            });
            var url3 = '//api.ssad.localhost/report/listResolved';
            $http.get(url3).success(function (data, status, headers, config) {
                $scope.RreportList = data;
                $scope.RtotalItems = $scope.RreportList.length;
            });
            var url4 = '//api.ssad.localhost/agency/list';
            $http.get(url4).success(function (data, status, headers, config) {
                $scope.agencyList = data;
            });

            //pagination
            $scope.pageSize = 10;
            $scope.PcurrentPage = 1;
            $scope.OcurrentPage = 1;
            $scope.RcurrentPage = 1;
        };

        //Logic for pending/ongoing/resolved buttons
        $scope.showPending = function () {
            $scope.pending = 1;
            $scope.ongoing = 0;
            $scope.resolved = 0;
        };
        $scope.showOngoing = function () {
            $scope.pending = 0;
            $scope.ongoing = 1;
            $scope.resolved = 0;
        };
        $scope.showResolved = function () {
            $scope.pending = 0;
            $scope.ongoing = 0;
            $scope.resolved = 1;
        };

        listReportT().success(function (data) {
            $scope.reportTypes = data;
        });

        $scope.retrieveAgency = function () {
            var url = '//api.ssad.localhost/agency/list';
            $http.get(url).success(function (data, status, headers, config) {
                $scope.agencyList = data;
            });
        };

        $scope.createReport = function () {
            var url = "//api.ssad.localhost/report/create";
                $http.post(url, {
                    'reportName': $scope.reportName,
                    'location': $scope.location,
                    'reportType': $scope.reportType,
                    'reportedBy': $scope.reportedBy,
                    'contactNo': $scope.contactNo,
                    'assignedTo': $scope.assignedTo,
                    'description':$scope.description
                }).success(function (data, status, headers, config) {
                    $location.url('/operator/home/');
                    toastr.success('Report Created.');
                }).error(function(data) {
                    toastr.error(data.error.message);
                });
        };
            $scope.deleteReport = function ($reportID){
                var url = "//api.ssad.localhost/report/delete";
                bootbox.confirm("Are you sure you want to delete this report?", function (result) {
                if (result) {
                    $http.post(url, {
                        'reportID': $reportID
                    }).success(function (data, status, headers, config) {
                        window.setTimeout(function(){location.reload()},1000)
                        toastr.success('Report Deleted.');
                    });
                    }
                })
            };

            $scope.findReport = function ($reportID) {
                $rootScope.operatorReportID = $reportID;
                $location.url('/report/edit/' + $reportID);
            };

            $scope.populateReport = function (){
                var url = '//api.ssad.localhost/agency/list';
                $http.get(url).success(function (data, status, headers, config) {
                    $scope.agencyList = data;
                });

                var url2 = "//api.ssad.localhost/report/populate";
                    $http.post(url2, {
                        'reportID': $rootScope.operatorReportID
                    }).success(function (data, status, headers, config) {
                        $scope.reportID=data.reportID;
                        $scope.reportType=data.reportType;
                        $scope.reportName=data.reportName;
                        $scope.reportedBy=data.reportedBy;
                        $scope.contactNo=data.contactNo;
                        $scope.location=data.location;
                        $scope.assignedTo=data.assignedTo;
                        $scope.description=data.description;
                    })
            };

        $scope.updateReport = function () {
            var url = "//api.ssad.localhost/report/update";

                bootbox.confirm("Are you sure you want to update this report?", function (result) {
                    if (result) {
                        $http.post(url, {
                            'reportID': $rootScope.operatorReportID,
                            'reportName': $scope.reportName,
                            'location': $scope.location,
                            'reportType': $scope.reportType,
                            'reportedBy': $scope.reportedBy,
                            'contactNo': $scope.contactNo,
                            'assignedTo': $scope.assignedTo,
                            'description': $scope.description
                        }).success(function (data, status, headers, config) {
                            toastr.success('Report Updated.');
                            $location.path('/operator/manage_report')
                        }).error(function(data) {
                            toastr.error(data.error.message);
                        });
                    }
                });
        };

    });

    app.controller('AgencyCtrl', function($scope, $http, $rootScope, $location, $filter){
        $scope.listReports = function () {

            $scope.pending = 1 ;
            var url = '//api.ssad.localhost/report/listPending';
            $http.post(url, {
                'agencyId': $rootScope.auth.agencyId
            }).success(function (data, status, headers, config) {
                $scope.PreportList = data;
                $scope.PtotalItems = $scope.PreportList.length;
            });
            var url2 = '//api.ssad.localhost/report/listOngoing';
            $http.post(url2, {
                'agencyId': $rootScope.auth.agencyId
                }).success(function (data, status, headers, config) {
                $scope.OreportList = data;
                $scope.OtotalItems = $scope.OreportList.length;
            });
            var url3 = '//api.ssad.localhost/report/listResolved';
            $http.post(url3, {
                'agencyId': $rootScope.auth.agencyId
            }).success(function (data, status, headers, config) {
                $scope.RreportList = data;
                $scope.RtotalItems = $scope.RreportList.length;
            });
            var url4 = '//api.ssad.localhost/agency/list';
            $http.get(url4).success(function (data, status, headers, config) {
                $scope.agencyList = data;
                //find the current agency
                $scope.currentAgencyId = $rootScope.auth.agencyId;
                $scope.currentAgencyName = $scope.agencyList[$scope.currentAgencyId-1].agencyName;
            });
        }

        //pagination
        $scope.pageSize = 10;
        $scope.PcurrentPage = 1;
        $scope.OcurrentPage = 1;
        $scope.RcurrentPage = 1;

        //Logic for pending/ongoing/resolved buttons
        $scope.showPending = function () {
            $scope.pending = 1;
            $scope.ongoing = 0;
            $scope.resolved = 0;
        };
        $scope.showOngoing = function () {
            $scope.pending = 0;
            $scope.ongoing = 1;
            $scope.resolved = 0;
        };
        $scope.showResolved = function () {
            $scope.pending = 0;
            $scope.ongoing = 0;
            $scope.resolved = 1;
        };

        $scope.findReport = function ($reportID) {
            $rootScope.AgencyReportID = $reportID;
            $location.url('/report/update/' + $reportID);
        };

        $scope.populateReport = function (){
            var url = "//api.ssad.localhost/report/populate";
            $http.post(url, {
                'reportID': $rootScope.AgencyReportID
            }).success(function (data, status, headers, config) {
                $scope.reportID=data.reportID;
                $scope.reportType=data.reportType;
                $scope.reportName=data.reportName;
                $scope.reportedBy=data.reportedBy;
                $scope.contactNo=data.contactNo;
                $scope.location=data.location;
                $scope.status=data.status;
                $scope.comment=data.comment;
                $scope.description=data.description;
            })

            var url2 = "//api.ssad.localhost/report/listStatus";
            $http.get(url2).success(function (data, status, headers, config) {
                $scope.reportTypeStatuses = data;
            });
        }
        $scope.updateReport = function () {
            bootbox.confirm("Are you sure you want to update this report?", function (result) {
                if (result) {
                    var url = "//api.ssad.localhost/report/updateStatus";
                    $http.post(url, {
                        'reportID': $rootScope.AgencyReportID,
                        'status': $scope.status,
                        'comment': $scope.comment
                    }).success(function (data, status, headers, config) {
                        toastr.success('Report Updated.');
                        $location.path('/agency/manage_report')
                    }).error(function(data) {
                        toastr.error(data.error.message);
                    });
                }
            });
        };
    });


    app.controller('SidebarCtrl', function($scope, $http, $location, $rootScope, $timeout, retrieveMenu){
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

    app.controller('SubCtrl', function($scope, $http, $location, $rootScope, listSub){
        $scope.subs = {}

        listSub().success(function(data){
            $scope.subs = data;
        });


        // pagination
        $scope.curPage = 0;// current Page
        $scope.pageSize = 10;

        $scope.numberOfPages = function() {
            return Math.ceil($scope.subs.length / $scope.pageSize);
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
                },
                'forgetpass': {
                    url: api_url + '/auth/forgetpass',
                    method: 'POST',
                    withCredentials: true
                }
            });
    }]);

    app.factory('authorizationService', ['Auth', '$resource', '$q', '$rootScope', '$location',
        function(Auth, $resource, $q, $rootScope, $location){


            return {
                permissionModel:{
                    permission: {},
                    isPermissionLoaded: false
                },
                permissionCheck: function(roleCollection) {
                    var deferred = $q.defer();
                    //pointer to parent scope
                    var parentPointer = this;

                    //is already filled from service
                    if(this.permissionModel.isPermissionLoaded) {
                        //check if current user has required role
                        this.getPermission(this.permissionModel, roleCollection, deferred);
                    }
                    else {
                        Auth.get().$promise.then(function (response) {
                            //when server service responds then we will fill the permission object
                            parentPointer.permissionModel.permission = response.accountType;

                            //Indicator is set to true that permission object is filled and
                            //can be re-used for subsequent route request for the session of the user
                            parentPointer.permissionModel.isPermissionLoaded = true;

                            //Check if the current user has required role to access the route
                            parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
                        }, function (error) {
                            window.location.href = $rootScope.homeUrl('login');
                        });
                    }
                    return deferred.promise;
                },
                getPermission: function (permissionModel, roleCollection, deferred) {
                    var ifPermissionPassed = false;

                    angular.forEach(roleCollection, function (role) {
                        switch (role) {
                            case 1:
                                console.log(permissionModel.permission);
                                if (permissionModel.permission == 1) {
                                    ifPermissionPassed = true;
                                }
                                break;
                            case 2:
                                console.log(permissionModel.permission);
                                if (permissionModel.permission == 2) {
                                    ifPermissionPassed = true;
                                }
                                break;
                            case 3:
                                console.log(permissionModel.permission);
                                if (permissionModel.permission == 3) {
                                    ifPermissionPassed = true;
                                }
                                break;
                            default:
                                ifPermissionPassed = false;
                        }
                    });
                    if (!ifPermissionPassed) {
                        //If user does not have required access,
                        //we will route the user to unauthorized access page
                        window.location.href = $rootScope.homeUrl('login');
                        //As there could be some delay when location change event happens,
                        //we will keep a watch on $locationChangeSuccess event
                        // and would resolve promise when this event occurs.
                        $rootScope.$on('$locationChangeSuccess', function (next, current) {
                            deferred.resolve();
                        });
                    } else {
                        deferred.resolve();
                    }
                }

            }
        }
    ]);


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

    app.factory('listSub', function($http){
        return function() {
            var promise = $http.get(api_url + '/getSub');
            return promise;
        }
    });


    app.factory('listReportT', function($http){
        return function() {
            var promise = $http.get(api_url + '/getReport_T');
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
            'reports': {
                url: api_url + '/getAnalytics/reports',
                method: 'GET',
                withCredentials: true
            },
            'subscribers': {
                url: api_url + '/getAnalytics/subscribers',
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
