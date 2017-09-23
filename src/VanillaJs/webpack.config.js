﻿const path = require("path");
const webpack = require("webpack");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';


module.exports = env => {
  const isDevBuild = !(env && env.prod);
  return [{
    stats: { modules: false },
    entry: { 'main': './Client/main.ts' },
    resolve: { extensions: ['.js', '.ts'] },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: '[name].js',
      publicPath: 'dist/'
    },
    module: {
      rules: [
        { test: /\.tsx?$/, include: /Client/, use: 'awesome-typescript-loader?silent=true' },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ]
    },
    plugins: [
      new CheckerPlugin()
    ].concat(isDevBuild ? [
      // Plugins that apply in development builds only
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin()
      ])
  }];
};