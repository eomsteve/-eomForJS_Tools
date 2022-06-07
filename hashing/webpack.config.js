const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode : "development",
  entry : "./src/index.js",
  output : {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],
  // source map
  devtool: 'source-map',
  // paths
  resolve : {
    alias : {
      '@eom' : path.resolve(__dirname, './'),
    }
  }
}