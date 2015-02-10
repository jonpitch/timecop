module.exports = function (grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-less');

	// init
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// combine ember templates into Em.TEMPLATES
		emberTemplates: {
			compile: {
				options: {
					templateBasePath: 'public/scripts/templates/',
					templateName: function (sourceFile) {
						return sourceFile.substr(sourceFile.indexOf('/') + 1, sourceFile.length);
					}
				},
				files: {
					'public/scripts/templates/templates.js': ['public/scripts/templates/**/*.{hbs, handlebars}']
				}
			}
		},

		// concatenate files together
		concat: {
			ember: {
				src: [
					'public/scripts/application/app.js',
					'public/scripts/mixins/**/*.js',
					'public/scripts/routes/**/*.js',
					'public/scripts/models/*.js',
					'public/scripts/controllers/**/*.js',
					'public/scripts/views/**/*.js',
					'public/scripts/components/**/*.js',
					'public/scripts/templates/templates.js'
				],
				dest: 'public/scripts/app.js'
			},
			bower: {
				src: [
					'public/bower_components/jquery/dist/jquery.js',
					'public/bower_components/bootstrap/dist/js/bootstrap.js',
					'public/bower_components/handlebars/handlebars.js',
					'public/bower_components/ember/ember.js',
					'public/bower_components/ember-data/ember-data.js',
					'public/bower_components/modernizr/modernizr.js',
					'public/bower_components/moment/moment.js'
				],
				dest: 'public/scripts/app.includes.js'
			}
		},

		// compile styles
		less: {
			development: {
				options: {

				},
				files: {
					'public/styles/app.less.css': 'public/styles/less/*.less'
				}
			}
		},

		// combine css files
		cssmin: {
			combine: {
				options: {
					root: './public',
					processImport: true
				},
				files: {
					'public/styles/app.css': [
						'public/bower_components/bootstrap/dist/css/bootstrap.css',
						'public/styles/app.less.css'
					]
				}
			},
			minify: {
				expand: true,
				cwd: 'public/styles',
				src: ['*.css', '!*.min.css'],
				dest: 'public/styles',
				ext: '.min.css'
			}
		},

		// lint JavaScript files
		jshint: {
			files: [
				'Gruntfile.js',
				'public/scripts/controllers/**/*.js',
				'public/scripts/models/*.js',
				'public/scripts/routes/**/*.js',
				'public/scripts/views/**/*.js',
				'public/scripts/components/**/*.js',
				'public/scripts/application/*.js'
			],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		// TODO minify javascript
		uglify: {

		},

		// perform any string replace operations.
		// swap out urls, change files to their minified versions, etc.
		// TODO
		'string-replace': {

		},

		// watch for changes
		watch: {
			options: {

			},
			html: {
				files: ['public/scripts/templates/**/*.{hbs, handlebars}'],
				tasks: ['emberTemplates']
			},
			js: {
				files: [
					// include
					'public/scripts/**/*.js',
					'Gruntfile.js',
					// exclude
					'!public/scripts/app.js',
					'!public/scripts/app.includes.js'
					],
				tasks: ['jshint', 'concat']
			},
			css: {
				files: ['public/styles/less/*.less'],
				tasks: ['less:development', 'cssmin']
			}
		}
	});

	// the local development build task
	grunt.registerTask('default', [
		'emberTemplates',
		'concat',
		'jshint',
		'less:development',
		'cssmin'
	]);
};
