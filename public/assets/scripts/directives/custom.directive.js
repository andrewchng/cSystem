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
                        element.removeClass('open');
                        element.find('span.arrow').removeClass('open');
                        element.children('.sub-menu').slideUp("slow");
                    }
                });

            }
        };
    });

}())