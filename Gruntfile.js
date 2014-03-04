module.exports = function(grunt) {
  
  

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

     watch: {
      express:{
        files: ['core/**/*.js'],
        tasks:['express:dev']
      },
      compass:{
        files: ['content/assets/scss/*.scss'],
        tasks:['compass:dev']
      },

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
      jshintrc: "./jshint.json",
      browser_files: ["./content/assets/**/*.js"],
      server_files: ["./core/**/*.js"]
    },


  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask("default", ["compass", "jshint"]);
  grunt.registerTask("server", ['express:dev', 'watch']);
};