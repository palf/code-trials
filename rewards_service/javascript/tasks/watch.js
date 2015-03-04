var config = {
    options: { atBegin: true },

    lint: {
        files: ['<%= lint.all.src %>', '.jshintrc' ],
        tasks: [ 'lint' ]
    },

    test: {
        files: [ '<%= test.all %>', 'src/**/*.js' ],
        tasks: [ 'test' ]
    }
};

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', config);
};
