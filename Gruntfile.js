'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js',
          'public/js/application/{,*/}*.js'
        ],
        tasks: ['develop', 'concat', 'delayed-livereload']
      },
      jade : {
        files: [
          'public/modules/*.jade'
        ],
        tasks: ['jade']
      },
      css: {
        files: [
          'public/css/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    },

    jade: {
      compile: {
          options: {
              client: false,
              pretty: true
          },
          files: [ {
            cwd: "public/modules",
            src: "**/*.jade",
            dest: "public/templates",
            expand: true,
            ext: ".html"
          } ]
      }
    },

    develop: {
      server: {
        file: 'app.js'
      }
    },

    sass: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.scss'
        }
      }
    },

    concat : {
      options: {
        separator: ';',
      },
      dist : {
        src : ['public/js/application/{,*/}*.js'],
        dest : 'public/js/all.js'
      }
    },

    wiredep: {
      task: {
        src: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        ignorePath : '../../public/',
        exclude : [/bootstrap.js/]
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass',
    'wiredep',
    'concat',
    'jade',
    'develop',
    'watch'
  ]);
};
