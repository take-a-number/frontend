/* Copyright Josh Wilson, 2018 - All rights reserved */
'use strict';

let path = require('path');
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');
const srcPath = path.resolve(__dirname, 'src');
const staticPath = path.resolve(__dirname, 'static');
const templatePath = path.resolve(__dirname, 'template');

module.exports = {
  context: srcPath,
  entry: './index.tsx',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      },
      /*{
        test: /\.(scss|sass)$/,
        use: ['sass-loader']
      },*/
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // for bootstrap's fonts and other files
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  // Allows debugging in development
  devtool: "inline-source-map",
  devServer: {
    contentBase: buildPath,
    hot: false,
    open: true,
    host: "0.0.0.0"
  },
  plugins: [
    new CopyWebpackPlugin([
      path.resolve(staticPath, "*"),
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      showErrors: true,
      template: path.resolve(templatePath, "index.html")
    })
  ],
  output: {
    filename: '[name].js',
    path: buildPath,
  }
};

console.log(path.resolve(staticPath, "*"));