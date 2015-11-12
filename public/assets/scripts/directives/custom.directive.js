(function(){
    'use strict';

    var app = angular.module('cSystem');

    app.directive('subMenuSlide', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    if (!element.hasClass('open')){
                        element.addClass('open');
                        element.find('span.arrow').addClass('open');
                        element.children('.sub-menu').slideDown("slow");
                    }
                    else{
                        //console.log(element.children('li').hasClass('active'));

                        element.removeClass('open');
                        element.find('span.arrow').removeClass('open');
                        element.children('.sub-menu').slideUp("slow");
                    }
                });

            }
        };
    });

    app.directive('linkBreadcrumb', ['$location', function (location) {
        return {
            template: '<ol class="breadcrumb"><li data-ng-repeat="item in breadcrumb_list"><a href="{{item.url}}"><span data-ng-bind-html="item.icon"></span>{{item.label}}</a></li></ol>',
            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.breadcrumb_list = location.path().split('/');
                console.log(scope.breadcrumb_list);
                if(scope.breadcrumb_list[1] == 'operator'){
                    var initial_item = {
                        'icon': '<i class="fa fa-home"></i> ',
                        'url': '/operator/home',
                        'label': ' Home'
                    };
                }
                else{
                    var initial_item = {
                        'icon': '<i class="fa fa-home"></i> ',
                        'url': '/admin',
                        'label': ' Home'
                    };
                }


                scope.breadcrumb_list = scope.breadcrumb_list.reduce(function (previous_value, current_value) {
                    if (current_value && isNaN(current_value) && current_value != "list") {

                        var current_value_url = current_value;
                        current_value = current_value.replace(/-|_/g, ' ');
                        var url = '';
                        if(previous_value.length > 1) {
                            var first_url = previous_value[previous_value.length -1].url.split('/')[1];
                            url = '/' + first_url +'/' + current_value_url;
                        }
                        else{
                            url = '/' + current_value_url + '/list';
                        }

                        var new_item = {
                            url: url,
                            'label': current_value.charAt(0).toUpperCase() + current_value.slice(1).toLowerCase()
                        };
                        if(current_value != 'operator')
                            previous_value.push(new_item);
                    }
                    return previous_value;
                }, [initial_item]);
            }
        };
    }]);

    app.directive('loadingPendulums', function () {
        return {
            template: '<div class="loading-container"><div class="loading-buttons pendulums"><i></i><i></i><i></i><i></i><i></i><div class="text" data-ng-bind="text"></div></div></div>',
            restrict: 'A',
            scope: {
                text: '@'
            },
            link: function (scope) {
            }
        };
    });


    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter, {$event: event});
                    });
                    event.preventDefault();
                }
            });
        };
    });

    app.directive('mainMap', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            template: '<div id="map-container" class="page-content-inner" style="min-height: 748px; margin-top: 30px;"></div>',
            scope: false,
            controller: function ($scope, $attrs, $element, Activities) {
                console.log(dojo.byId('map-container_zoom_slider'));
                $timeout(function() {
                    $.getScript('assets/scripts/map/map-main.js');
                    $.getScript('assets/scripts/map/dengue.js');
                    $.getScript('assets/scripts/map/traffic.js');
                }, 0);
            }
        };
    }]);

    app.directive('todayActivity',['$timeout', function($timeout) {
        return {
            restrict: 'E',
            template: '<span class="label label-primary activity_head" >Today\'s Activities</span>' +
                        '<div class="text-slider col-md-12">' +
                                '<div ng-repeat="msg in messages">'+
                            '<p ng-bind-html="msg"> </p> </div></div>',
            scope: false,
            controller: function ($scope, $attrs, $element, Activities) {
                $scope.messages = [];
                //console.log($scope.items);

                Activities().success(function(data) {
                    //console.log(data);


                    for(var i=0; i<data.users_created.length; i++){
                        if(data.users_created[i].accountType == 1)
                            $scope.messages.push('<i class="circle-green fa fa-circle"></i>' + 'New Account <b>' + data.users_created[i].username + '</b> (Administrator) created.');
                        else if((data.users_created[i].accountType == 2))
                            $scope.messages.push('<i class="circle-green fa fa-circle"></i>' + 'New Account <b>' + data.users_created[i].username + '</b> (Operator) created.');
                        else
                            $scope.messages.push('<i class="circle-green fa fa-circle"></i>' + 'New Account <b>' + data.users_created[i].username + '</b> (Agency) created.');
                    }

                    for(var j=0; j<data.users_updated.length; j++){
                        if(data.users_updated[j].accountType == 1)
                            $scope.messages.push('<i class="circle-yellow fa fa-circle"></i>' + 'Existing Account <b>' + data.users_updated[j].username + '</b> (Administrator) updated.');
                        else if((data.users_updated[j].accountType == 2))
                            $scope.messages.push('<i class="circle-yellow fa fa-circle"></i>' + 'Existing Account <b>' + data.users_updated[j].username + '</b> (Operator) updated.');
                        else
                            $scope.messages.push('<i class="circle-yellow fa fa-circle"></i>' + 'Existing Account <b>' + data.users_updated[j].username + '</b> (Agency) updated.');
                    }

                    for(var i=0; i<data.agencies_created.length; i++)
                            $scope.messages.push('<i class="circle-green fa fa-circle"></i>' + 'New Agency <b>' + data.agencies_created[i].agencyName + '</b> created. <b>Address:</b> ' + data.agencies_created[i].agencyAddress + ' <b>Telephone:</b> ' + data.agencies_created[i].agencyTel);
                    for(var j=0; j<data.agencies_updated.length; j++)
                        $scope.messages.push('<i class="circle-yellow fa fa-circle"></i>' + 'Existing Agency <b>' + data.agencies_updated[j].agencyName + '</b> updated. <b>Address:</b> ' + data.agencies_updated[j].agencyAddress + ' <b>Telephone:</b> ' + data.agencies_updated[j].agencyTel);

                    for(var i=0; i<data.reports_created.length; i++)
                        $scope.messages.push('<i class="circle-green fa fa-circle"></i>' + 'New Report <b>' + data.reports_created[i].reportName + '</b> filed. <b>Current Status:</b> ' + data.reports_created[i].reportStatusTypeName + ' <b>Incident Location:</b> ' + data.reports_created[i].location);
                    for(var j=0; j<data.reports_updated.length; j++)
                        $scope.messages.push('<i class="circle-yellow fa fa-circle"></i>' + 'Existing Report <b>' + data.reports_updated[j].reportName + '</b> updated. <b>Current Status:</b> ' + data.reports_updated[j].reportStatusTypeName + ' <b>Incident Location:</b> ' + data.reports_updated[j].location);
                    for(var k=0; i<data.reports_deleted.length; k++)
                        $scope.messages.push('<i class="circle-red fa fa-circle"></i>' + 'New Report <b>' + data.reports_deleted[k].reportName + '</b> deleted.  <b>Incident Location:</b> ' + data.reports_deleted[k].location);


                    $scope.activityList = data;

                });


                $scope.initSlide = function () {

                    $element.children('.text-slider').slick(
                        {
                            autoplay: true,
                            infinite: true,
                            dots: false,
                            arrows: false
                        }
                    );


                };


                $scope.$watch('activityList', function(){
                    if($scope.messages.length > 0) {

                        $timeout(function() {
                            $scope.initSlide()
                        }, 0);
                    }
                });



            }
        };
    }]);



}())