module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
 
        // get package info
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            js: {
                files: ['app/**/*.js']
            },
            styles: {
                files: ['.tmp/css/**/*.css']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/**/*.html',
                    'app/**/*.js'
                ]
            }
        },

        // start local server
        connect: {
            options: {
                port: 8999,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: ['app']
                }
            },
            server: {
                options: {
                    port: 8999,
                    base: [
                        'app'
                    ],
                    keepalive: true
                }
            }
        },

        jshint: {
            jshintrc: '.jshintrc',
            all: [
                'Gruntfile.js',
                'app/**/*.js'
            ]
        }
    });

    grunt.registerTask('serve', function (target) {
        grunt.task.run(['connect:livereload', 'watch']);
    });

    grunt.registerTask('default', ['jshint']);
};

