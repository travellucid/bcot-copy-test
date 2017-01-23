module.exports = function(grunt) {

  grunt.log.write("Task: " + grunt.cli.tasks + "\n");
  grunt.log.write("build started for Brancott at: " + Date());

  grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),

	dirs: {
	  //JS
	  jsSource: "assets/scripts/",
	  jsSourceBootstrap: "node_modules/bootstrap/dist/js",
	  jsLibsDest: "../docroot/themes/sapient_brancott/js/js_libs/",
	  jsModulesDest: "../docroot/themes/sapient_brancott/js/brancott_js/",
	  // CSS
	  lessSrc: "assets/styles/",
	  lessSrcBootstrap: "node_modules/bootstrap/dist/css",
	  cssDest: "../docroot/themes/sapient_brancott/css/brancott_css/"
	},

	concat: {
	  // Vendor libraries go here...
	  jslibs: {
		src: [
			'<%= dirs.jsSource %>jquery.js',/*
			'<%= dirs.jsSource %>jquery.easing.min.js',
			'<%= dirs.jsSource %>jquery.slick.js',
			'<%= dirs.jsSource %>jquery.stickyNavbar.min.js',
			'<%= dirs.jsSource %>video.js',
			'<%= dirs.jsSource %>jquery.mobile-1.4.5.min.js',*/
			'<%= dirs.jsSourceBootstrap %>bootstrap.min.js'
		],
		dest: "<%= dirs.jsLibsDest %><%= pkg.name %>.libs.js"
	  },

	// Custom modules to be added below
	  jsmodules: {
		src: [
			'<%= dirs.jsSource %>brancott.js',
			'<%= dirs.jsSource %>sapient.common.js',
			'<%= dirs.jsSource %>sapient.carousel.js',
			'<%= dirs.jsSource %>sapient.hero.js',
			'<%= dirs.jsSource %>sapient.header.js',
			'<%= dirs.jsSource %>sapient.footer.js'
		],
		dest: "<%= dirs.jsModulesDest %><%= pkg.name %>.modules.ver.<%= pkg.version %>.dev.js"
	  }
	},

	less: {
	  development: {
		options: {
		  compress: true,
		  yuicompress: true,
		  optimization: 2
		},
		files: {
		  "<%= dirs.cssDest %><%= pkg.name %>.ver.<%= pkg.version %>.css": "<%= dirs.lessSrc %><%= pkg.name %>.global.less",
		}
	  }
	},

	lesslint: {
		options: {
  			formatters: [{
  				id: 'csslint-xml',
      			dest: 'report/lesslint.xml'
  			}],
  			failOnWarning: false,
  			failOnError: false
  		},
  		src: ['<%= dirs.lessSrc %>*.less']  		
  	},

	csslint: {
		strict: {
			options: {
				import: 2
			},
			src: ['<%= dirs.lessSrc %><%= pkg.name %>.global.less']
		}
	},

	jshint: {
		all: [
			'<%= dirs.jsSource %>brancott.js'
		]
	},

	uglify: {
		options: {
			compress: {
				drop_debugger: true,
				drop_console: true
			},
			mangle: false
		},
		dist: {
			files: {
				'<%= dirs.jsModulesDest %>sapient.modules.ver.1.0.0.js': '<%= dirs.jsModulesDest %>sapient.modules.ver.1.0.0.dev.js',
				}
		}
	},

	watch: {
	  scripts: {
		files: '<%= dirs.jsSource %>*.js',
		tasks: [/*'jshint',*/ 'concat']
	  },
	  less: {
		files: '<%= dirs.lessSrc %>*.less',
		tasks: ['less']
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['watch']);

  grunt.log.write("less");
  grunt.registerTask('build', [/*'jshint',*/'concat','uglify',/*'csslint','lesslint',*/'less']);
};