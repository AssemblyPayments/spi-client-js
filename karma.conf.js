module.exports = function (config) {
    'use strict';

    function getWebackConfig({ exclude, plugins } = {}) {
        return {
            test: /\.m?js$/,
            exclude,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        [
                            '@babel/transform-runtime',
                            {
                                'regenerator': true,
                            }
                        ],
                        ...(Array.isArray(plugins) ? plugins : []),
                    ]
                }
            },
        };
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // Our code
            // './src/**/*.js',

            { pattern: 'test-context.js', watched: false },

            // Include the unit tests 
            // './tests/**/*.spec.js',

            // Mock fixtures 
            './tests/fixtures/**/*.json'
        ],

        // plugins: [
        //     'karma-json-fixtures-preprocessor'
        // ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage'],
            './tests/fixtures/**/*.json': ['json_fixtures'],
            'test-context.js': ['webpack']
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    // two seperate rules are required so that spec files are not instrumented
                    // and included in coverage reporting
                    getWebackConfig({ exclude: [/(bower_components|node_modules|tests)/], plugins: [ 'istanbul' ] }),
                    getWebackConfig({ exclude: [/(bower_components|node_modules)/] }),
                ]
            },
            watch: true
        },
        
        webpackServer: {
            noInfo: true
        },

        jsonFixturesPreprocessor: {
            // strip this from the file path \ fixture name
            stripPrefix: 'tests/fixtures/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // code coverage reporter
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'json', subdir: '.' },
                { type: 'lcov', subdir: '.' },
                { type: 'text' },
              ]
        },

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
