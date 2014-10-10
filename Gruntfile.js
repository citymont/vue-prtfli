/*
     * grunt-init
     * https://gruntjs.com/
     *
     * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
     * Licensed under the MIT license.
     */

    'use strict';
    
    var rewrite = require('connect-modrewrite');
    //http://danburzo.ro/grunt/chapters/server/
    
    module.exports = function(grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
            src: ['node_modules/normalize.css/normalize.css'],
            dest: 'assets/less/base.less'
          }
        },

        jshint: {
          all: [
            'Gruntfile.js',
            'assets/js/main.js',
          ],
          options: {
            globals: {
              jQuery: true,
              console: false,
              module: true
            }
          }
        },

        uglify: {
          dist: {
            files: {
              'assets/js/main.min.js': ['assets/js/main.js']
            }
          }
        },

        recess: {
          options: {
            compile: true,
            banner: '<%= banner %>'
          },
          main: {
            src: ['assets/less/main.less'],
            dest: 'assets/css/main.css'
          },
          min: {
            options: {
              compress: true
            },
            src: ['assets/less/main.less'],
            dest: 'assets/css/main.min.css'
          }
        },


        watch: {
          js: {
            files: ['assets/js/*.js'],
            tasks: ['uglify:dist'],
            options: {
              livereload: true,
            }
          },
          less: { 
            files: ['assets/less/*.less'],
            tasks: ['concat','recess'],
            options: {
              livereload: true,
            }
          }
        },

        connect: {
          server: {
            options: {
              keepalive: true,
              port: 8081,
              hostname: 'localhost',
              middleware: function(connect, options) {
                var middleware = [];

                // 1. mod-rewrite behavior
                var rules = [
                    '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                ];
                middleware.push(rewrite(rules));

                // 2. original middleware behavior
                var base = options.base;
                if (!Array.isArray(base)) {
                    base = [base];
                }
                base.forEach(function(path) {
                    middleware.push(connect.static(path));
                });

                return middleware;
              }
            }
          }
        }

      });

      // These plugins provide necessary tasks.
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-recess');
      grunt.loadNpmTasks('grunt-contrib-connect');

      // By default, lint and run all tests.
      grunt.registerTask('default', ['concat','uglify','recess']);

    };
