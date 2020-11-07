const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.join(__dirname, './'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HTMLWebpackPlugin({
      template: `${path.join(__dirname, 'public')}/index.html`,
    }),
  ],
};
