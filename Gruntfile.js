var reloadPort = 35729;

var request    = require('request');
module.exports = function(grunt) {

  var cfg = {
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'index.js'
      }
    },
     watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server:{
        files: ['core/server/**/*.js'],
        tasks:['develop','delayed-livereload']
      },
      compass:{
        files: ['content/assets/scss/*.scss'],
        tasks:['compass:dev', 'concat:dev']
      },
      concat: {
        files: ['core/client/**/*.js'],
        tasks:['concat:dev']
      },
      handlebars: {
        files: ['core/client/tpl/**/*.hbs'],
        tasks:['handlebars']
      }

    },

    copy : {
      main:{
        files: [
          {
            expand: true,
            src: [
              'content/assets/bower_components/font-awesome/fonts/*'
            ],
            dest: 'content/assets/fonts/',
            filter: 'isFile',
            flatten: true
          }
        ]
      }
    },

    clean: {
      test : {
          src: ['content/data/observer-test.db']
      }
    },

    concat: {
      dev : {
        files: {
          'content/assets/js/vendor.js': [
            'content/assets/bower_components/jquery/dist/jquery.min.js',
            'content/assets/bower_components/foundation/js/foundation.min.js',
            'content/assets/bower_components/handlebars/handlebars.js',
            'content/assets/bower_components/underscore/underscore.js',
            'content/assets/bower_components/backbone/backbone.js',
            'content/assets/bower_components/validator/validator.js',
            'content/assets/js/vendor/tinymce/tinymce.min.js'
          ],

          'content/assets/js/helpers.js': [
              'core/client/init.js',
              'core/client/helpers/**/*.js'
          ],

          'content/assets/js/views.js': [
            'core/client/views/base.js',
            'core/client/views/**/*.js',
            'core/client/router.js'
          ],

          'content/assets/js/templates.js': [
            'core/client/tpl/hbs-tpl.js'
          ],

          'content/assets/js/models.js': [
            'core/client/models/**/*.js'
          ],



          'content/assets/css/observer.css': [
            'content/assets/css/app.css',
            'content/assets/bower_components/font-awesome/css/font-awesome.css'
          ]
        }
      }
    },

    handlebars: {
      core: {
        options: {
          namespace: 'JST',
          processName: function (filename) {
            filename = filename.replace('core/client/tpl/', '');
            return filename.replace('.hbs', '');
          }
        },
        files: {
          'core/client/tpl/hbs-tpl.js': 'core/client/tpl/**/*.hbs'
        }
      }
    },


    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },

    compass: {
      dev: {
        config : 'config.rb'
      }
    },

    
    mochaTest:{
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['core/test/index.js']
      }
    },

      env : {
          options: {
              //Shared Options Hash
          },
          dev: {
              NODE_ENV: 'testing',
              DEST: 'temp'
          }
      },

    jshint: {
      jshintrc: './jshint.json',
      browser_files: ['./content/assets/**/*.js'],
      server_files: ['./core/**/*.js']
    }

  };


  grunt.initConfig(cfg);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');


  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

    grunt.registerTask('loadConfig', function () {
        var bootstrap, model;
        console.log('--> bootstrap <--');
        process.env.NODE_ENV = 'testing';
        bootstrap  = require('./core/bootstrap'),
        model      = require('./core/server/models');
        var done = this.async();
        bootstrap().then(function() {
            return model.init();
        }).then(function() {
           return done();
        });

    });

   grunt.registerTask('setTestEnv', 'Use "testing" Ghost config; unless we are running on travis (then show queries for debugging)', function () {
       process.env.NODE_ENV = 'testing';
//       cfg.express.test.options.node_env = process.env.NODE_ENV;
   });

  grunt.registerTask('default', ['compass', 'jshint']);
  grunt.registerTask('server', ['handlebars','concat:dev','develop', 'watch']);
  grunt.registerTask('test', 'Run unit tests (mocha)', ['env', 'clean:test', 'loadConfig', 'mochaTest']);

};