const path = require('path');
const PugPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    'app': './src/js/app.js'
  },
  output: {
      path: path.resolve(__dirname, './dist/'),
      filename: './js/[name].js',
  },
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
      // new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
          use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]'
          },
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [ 'html-loader?attrs=false', 'pug-html-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader?name=./css/[name].[ext]'
        // ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.png$/,
        use: [ 'file-loader?name=./images/[name].[ext]' ]
      },
      {
        test: /\.jpg$/,
        use: [ 'file-loader?name=./images/[name].[ext]' ]
      },
      {
        test: /\.php$/,
        use: [ 'file-loader?name=./php/[name].[ext]' ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [ 'file-loader?name=./fonts/[name].[ext]' ]
      }
    ]
  },
  plugins: [
    new PugPlugin({
      filename: './index.html',
      template: './src/index.pug',
      inject: false
    }),
    new HtmlWebpackPlugin()
  ]
};

    // ,
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].css",
    //   chunkFilename: "css/[id].css"
    // })
  //]
//};
