var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var autoprefixer = require('autoprefixer');

var devtool;

if (!process.env.PROD) {
  devtool = "source-map";
}

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './index.js',
    commons: ['angular', 'angular-ui-router', 'angular-i18n/angular-locale_tr-tr', 'oclazyload']
  },

  output: {
    path: __dirname + '/public',
    // publicPath: 'https://assets.myapp.com/',
    filename: 'myapp.[hash].js',
    chunkFilename: 'myapp.[id].[chunkhash].js'
  },
  module: {
    loaders: [
      {test: /\.jade$/, loader: 'jade', exclude: /node_modules/},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.styl$/, loader: ExtractTextPlugin.extract("style", "css!postcss!stylus?paths=src/styles"), exclude: /node_modules/},
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i, loader: "file?paths=src/images", exclude: /node_modules/},
    ]
  },
  resolve: {
    root: [__dirname + '/src'],
    extensions: ['', '.js', '.json', '.styl']
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },

  devtool: devtool,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.jade',
      inject: true
    }),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(JSON.parse(process.env.PROD || false))
    }),
    new CommonsChunkPlugin("commons", "commons.[hash].js"),
    new ExtractTextPlugin("[name].[hash].css"),
  ],

  devServer: {
    // webpack-dev-server options

    contentBase: "public",
    // or: contentBase: "http://localhost/",

    // hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    proxy: {
      "/api*": {
        target: "http://api-dev.myapp.com",
        xfwd: false,
        changeOrigin: true,
        rewrite: function (req){
         req.url = req.url.replace(/^\/api(.+)$/,'$1');
        }
      }
    },

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    // lazy: true,
    // filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // publicPath: "/assets/",
    // headers: { "X-Custom-Header": "yes" },
    stats: { colors: true },

    port: 9090
  }
};
