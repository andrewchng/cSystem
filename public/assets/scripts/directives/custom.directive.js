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
                var initial_item = {
                    'icon': '<i class="fa fa-home"></i> ',
                    'url': '/admin',
                    'label': ' Home'
                };
                scope.breadcrumb_list = scope.breadcrumb_list.reduce(function (previous_value, current_value) {
                    if (current_value && isNaN(current_value) && current_value != "list") {
                        var current_value_url = current_value;
                        current_value = current_value.replace(/-|_/g, ' ');
                        var url = '';
                        if(previous_value.length > 1) {
                            var first_url = previous_value[previous_value.length -1].url.split('/')[1];
                            url = '/' + first_url +'/' + current_value_url;
                        }
                        else
                            url = '/' + current_value_url + '/list';
                        var new_item = {
                            url: url,
                            'label': current_value.charAt(0).toUpperCase() + current_value.slice(1).toLowerCase()
                        };
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



}())