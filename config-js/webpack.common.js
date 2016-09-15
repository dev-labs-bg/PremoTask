var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': "./src/main.ts",
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts',  '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts', 'angular2-template-loader'] },
      { test: /\.html$/, loader: "raw-loader" },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=assets/[name].[hash].[ext]' },
      { test: /\.css$/, exclude: helpers.root('src', 'app'), loader: ExtractTextPlugin.extract('style', 'css?sourceMap') },
      { test: /\.css$/, include: helpers.root('src', 'app'), loader: 'raw' },
      { test: /\.scss$/, exclude: /node_modules/, loader: 'raw-loader!sass-loader' },
    ]
  },
};
