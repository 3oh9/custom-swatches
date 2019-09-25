var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client');

const NODE_ENV = process.env.NODE_ENV || 'development';

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const WebpackDefinePluginConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    API_PATH: JSON.stringify(process.env.API_PATH),
    SHOPIFY_API_KEY: JSON.stringify(process.env.SHOPIFY_API_KEY),
    SHOPIFY_API_SECRET: JSON.stringify(process.env.SHOPIFY_API_SECRET),
  },
});

const config = {
  entry: {
    main: APP_DIR + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015'],
              'stage-0',
              'react',
              'shopify/node',
            ],
            plugins: ['react-hot-loader/babel']
          }
        }
      },
      {
        test: /.(png|jpg|woff(2)?|eot|ttf|svg)(\?[a-z0-9=]+)?$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
    })],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      disable: NODE_ENV === 'development'
    }),
    WebpackDefinePluginConfig,
  ],
  devtool: 'eval-source-map'
};

module.exports = config;
