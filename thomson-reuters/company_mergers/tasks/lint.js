var config = {
    options: {
        jshintrc: '.jshintrc'
    },

    all: {
        src: [
            'public/js/*.js',
            'test/*.js',
            'server/*.js',

            'gruntfile.js',
            'tasks/*.js'
        ]
    }
};

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.renameTask('jshint', 'lint');
    grunt.config('lint', config);
};
