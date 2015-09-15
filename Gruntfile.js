'use strict';



//Gruntfile
module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        //project settings
        config: {
          app: 'public/assets',
          scripts: {
              'dist': 'public/assets/scripts',
              'main_plugins': 'public/assets/scripts/main-plugins'
          },
          css: {
              'dist': 'public/assets/styles',
              'main': 'public/assets/styles/main'
          }
        },

        // Task configuration
        concat: {
            options: {
                separator: ';'
            },
            js_main_plugins: {
                src: [
                    './bower_components/angular/angular.js',
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js'
                ],
                dest: '<%= config.scripts.dist %>/main-plugins.js'
            }
        },
        uglify: {
            options: {
                mangle: false  // Use if you want the names of your functions and variables unchanged
            },
            js_main_plugins: {
                files: {
                    '<%= config.scripts.dist %>/main-plugins.js': '<%= config.scripts.dist %>/main-plugins.js'
                }
            }
        },
        less: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= config.css.main %>',
                    src: ['*.less', '!*.css'],
                    dest: '<%= config.css.main %>',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.css.dist %>',
                    src: ['*.less', '!*.css'],
                    dest: '<%= config.css.dist %>',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.css.dist %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.css.dist %>',
                    ext: '.min.css'
                }]
            }
        },
        phpunit: {
            classes: {
                  //location of the tests
            },
            options: {

            }
        },
        watch: {
            js_main_plugins: {
                files: [
                    //watched files
                    '<%= config.scripts.main_plugins %>/{,*/}*.js'
                ],
                tasks: ['concat:js_main_plugins','uglify:js_main_plugins'],     //tasks to run
                options: {
                    livereload: true                        //reloads the browser
                }
            },
            less_main: {
                files: ['<%= config.css.main %>/*.less'],
                tasks: ['less:shop', 'less:dist'],                          //tasks to run
                options: {
                    livereload: true                                        //reloads the browser
                }
            },
            css_main: {
                files: ['<%= config.css.main %>.css'],
                tasks: ['cssmin:dist'],                                     //tasks to run
                options: {
                    livereload: true                                        //reloads the browser
                }
            }


        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-phpunit');


    // Task definition
    grunt.registerTask('default', ['watch']);


};