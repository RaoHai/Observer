

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
          script: 'index.js',
          output: 'Ghost is running'
      },

      dev: {
          options: {
              //output: 'Express server listening on address:.*$'
          }
      },
      test: {
          options: {
              node_env: 'testing'
          }
      }
    },

    sass: {
      options: {
        includePaths: ['content/assets/bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'content/assets/css/app.css': 'content/assets/scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'content/assets/scss/**/*.scss',
        tasks: ['sass', 'express']
      },

      express: {
                    // Restart any time client or server js files change
          files:  ['core/server.js', 'core/server/**/*.js'],
          tasks:  ['express:dev'],
          options: {
              //Without this option specified express won't be reloaded
              nospawn: true
          }
      }

    },

  }); 

  grunt.registerTask('server', [ 'express:dev', 'watch' ])


};