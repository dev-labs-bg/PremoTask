var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',

  output: {
    path: helpers.root('public'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
          'ENV': JSON.stringify(process.env.ENV)
      }
    })
  ],
});
