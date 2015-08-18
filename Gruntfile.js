grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.initConfig({
  imagemin: {
    dynamic: {
      files: [{
        expand: true,
        cwd: 'src/img/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'resources/img'
      }]
    }
  },
  postcss: {
    options: {
      map: {
        inline: false,
        annotation: 'resources/maps/'
      },
      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
        require('cssnano')() // minify the result
      ]
    },
    dist: {
      expand: true,
      cwd: 'src/css',
      src: ['**/*.css'],
      dest: 'resources/css/'
    }
  },
  shell: {
    copyJs: {
      command: 'cp -R src/js/ resources/js/'
    },
    jekyllServe: {
      command: 'jekyll serve --host 0.0.0.0 --safe --no-watch'
    }
  },
  watch: {
    files: ['src/**/**.*', 'index.html'],
    tasks: ['default']
  },
  concurrent: {
    target: {
      tasks: ['shell:jekyllServe', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-concurrent');
grunt.registerTask('default', ['imagemin', 'postcss', 'shell:copyJs', 'concurrent:target']);
