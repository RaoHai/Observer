
module.exports = function(grunt) {
  
  

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     watch: {
      express:{
        files: ['core/server/**/*.js'],
        tasks:['express:dev']
      },
      compass:{
        files: ['content/assets/scss/*.scss'],
        tasks:['compass:dev']
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

    concat: {
      dev : {
        files: {
          'content/assets/js/vendor.js': [
            'content/assets/bower_components/jquery/dist/jquery.min.js',
            'content/assets/bower_components/foundation/js/foundation.min.js',
            'content/assets/bower_components/handlebars/handlebars.js',
            'content/assets/bower_components/underscore/underscore.js',
            'content/assets/bower_components/backbone/backbone.js',

          ],

          'content/assets/js/helpers.js': [
              'core/client/init.js',
          ],

          'content/assets/js/views.js': [
            'core/client/views/**/*.js',
            'core/client/router.js'
          ],

          'content/assets/js/templates.js': [
                'core/client/tpl/hbs-tpl.js'
            ],
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
        config : 'config.rb',
        
      }
    },
    // sass: {
    //   options: {
    //     includePaths: ['content/assets/bower_components/foundation/scss']
    //   },
    //   dist: {
    //     options: {
    //       outputStyle: 'compressed'
    //     },
    //     files: {
    //       'content/assets/css/app.css': 'content/assets/scss/app.scss'
    //     }        
    //   }
    // },

    jshint: {
      jshintrc: './jshint.json',
      browser_files: ['./content/assets/**/*.js'],
      server_files: ['./core/**/*.js']
    },


  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['compass', 'jshint']);
  grunt.registerTask('server', ['handlebars','concat:dev','express:dev', 'watch']);
};