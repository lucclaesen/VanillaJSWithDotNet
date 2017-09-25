const path = require("path");
const webpack = require("webpack");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

/**
 * Personal remarks.
 * 
 * One important deviation from the default template is the publicPath configuration,
 * which instructs the webpack dev server to look for packages for HRM.
 * As originally set to "dist/" (a relative path), when serving the application from
 * a virtual dir (e.g. http://localhost:1234/Home instead of http://localhost:1324), the
 * HMR client will look for package updates in http://localhost:1234/Home/dist/__webpack_hrm.
 * 
 * This is very problematic when using webpack in conjunction with mvc and non-default
 * controllers.
 * 
 * We therefore use an absolute path "/dist/" as publicPathValue.
 */

module.exports = env => {
  const isDevBuild = !(env && env.prod);
  return [{
    stats: { modules: false },
    entry: { 
      'ex01': './Client/ex01.ts'
     },
    resolve: { extensions: ['.js', '.ts'] },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: '[name].js',
      publicPath: '/dist/' 
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
