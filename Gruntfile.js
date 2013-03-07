/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "src",
          out: "src/output.js"
        }
      }
    },
    jasmine: {
      src: "main.js",
      options: {
        version: '2.1.2',
        specs: "test/spec/*.spec.js",
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: 'src/'
          }
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        'define': false
      },
      files: ['src/*.js', 'test/spec/*.js']
    }
  });

  // Default task.
  // grunt.registerTask('default', 'lint ');

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};
