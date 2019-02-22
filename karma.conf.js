module.exports = function (config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // Vendor libs
            'node_modules/aes-js/index.js',
            'node_modules/bn.js/lib/bn.js',
            'node_modules/jssha/src/sha256.js',

            // Our code
            'src/**/*.js',

            // Include the unit tests 
            'tests/**/*.spec.js',

            // Mock fixtures 
            './tests/fixtures/**/*.json'
        ],

        // plugins: [
        //     'karma-json-fixtures-preprocessor'
        // ],

        // list of files to exclude
        exclude: [
            'src/index.js',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './tests/fixtures/**/*.json': ['json_fixtures']
        },

        jsonFixturesPreprocessor: {
            // strip this from the file path \ fixture name
            stripPrefix: 'tests/fixtures/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadlessNoSandbox'], 
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
              base: 'ChromeHeadless',
              flags: ['--no-sandbox']
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

    });
};
