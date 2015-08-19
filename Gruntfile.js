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
      command: 'jekyll serve --watch --safe --host 0.0.0.0'
    }
  },
  watch: {
    css: {
      files: ['src/css/*.css'],
      tasks: ['postcss']
    },
    js: {
      files: ['src/js/*.js'],
      tasks: ['shell:copyJs']
    },
    img: {
      files: ['src/**/*.{jpg,png,gif}'],
      tasks: ['imagemin']
    }
  },
  concurrent: {
    target: {
      tasks: ['watch', 'shell:jekyllServe'],
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
grunt.registerTask('default', ['concurrent:target']);
grunt.registerTask('lazy', ['imagemin', 'postcss', 'shell:copyJs']);
