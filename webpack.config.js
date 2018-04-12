/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var env = process.env.WEBPACK_ENV;

var libraryName = 'ssa.styler.bundle';
var outputFile = libraryName + '.js';

if (env === 'build') {
  outputFile = libraryName + '.min.js';
}

var config = {
  mode: 'production',
  entry: __dirname + '/src/styling.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    minimize: true,
  }
};

module.exports = config;
