/* jshint node: true */
'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			client: [
				'public/js/**/*.js',
				'!public/js/vendor'
			]
		},
		less: {
			compile: {
				files: {
					'build/css/compiled.css': 'public/css/**/*.less'
				}
			}
		},
		concat: {
			js: {
				files: {
					'build/js/bundle.js': 'public/js/**/*.js'
				}
			}
		},
		uglify: {
			bundle: {
				files: {
					'build/js/bundle.min.js': 'build/js/bundle.js'
				}
			}
		},
		sprite: {
			icons: {
				src: 'public/img/icons/*.png',
				dest: 'build/img/icons.png',
				destCss: 'build/css/icons.css'
			}
		},
		clean: {
			js: 'build/js',
			css: 'build/css',
			img: 'build/img',
			timestamp: 'build/timestamps.txt'
		},
		timestamp: {
			options: {
				file: 'build/timestamps.txt'
			}
		},
		encrypt: {
			encryptConfigFiles: {
				options: {
					key: 'nonsense',
					dest: './',
					ext: 'encrypted'
				},
				files: {
					'configFiles': ['./secret.json']
				}
			},
			decryptConfigFiles: {
				options: {
					key: 'nonsense',
	 				dest: './',
					decrypt: true
				},
				files: {
					'configFiles': ['./secret.json.encrypted']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-encrypt');
	grunt.registerTask('default', ['jshint']); // register a default task alias
	grunt.registerTask('js', 'Concatenate and minify static JS assets', 
		['concat:js', 'uglify:bundle']);
	grunt.registerTask('timestamp', function() {
		let options = this.options({
			file: '.timestamp'
		});
		let timestamp = +new Date();
		let contents = timestamp.toString();

		grunt.file.write(options.file, contents);
	});
};
