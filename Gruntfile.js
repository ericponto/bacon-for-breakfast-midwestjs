module.exports = function(grunt) {
	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					"dist/app.js": "src/app.js"
				},
				options: {
					transform: ["babelify", "mithrilify"]
				}
			}
		},
		watch: {
			js: {
				files: ["src/**/*.js"],
				tasks: ["browserify"] 
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["browserify"]);
}