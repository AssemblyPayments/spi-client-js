const path                          = require('path');
const fs                            = require("fs");
const webpack                       = require('webpack');
const apiMocker                     = require('connect-api-mocker');


const sourcePath    = path.resolve(__dirname,'src');
const outputPath    = path.resolve(__dirname,'dist');
const isProd        = process.argv.indexOf("-p") !== -1;
const pkg           = JSON.parse(fs.readFileSync('./package.json'));

const config = {

    mode: isProd ? "production" : "development",

    entry: './index.js',
    
    output: {
        filename: 'spi-client-js.js',
        path: outputPath,
        path: outputPath,
        library: "spi-client-js",
        libraryTarget: "umd"        
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        contentBase: outputPath,
        compress: true,
        hot: true,
        port: 3000,
        host: 'localhost',
        disableHostCheck: true,
        before: function(app) {
            app.use('/api', apiMocker('/mocks/api'));
        }
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
      rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
      ]
    },
    plugins: []
};

if(isProd) {
    config.devtool = "source-map";
} else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devtool = "inline-source-map";
}

module.exports = config;


