const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /index\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'SERVER_URL',
          replace: 'VALIDATION_SERVER_URL',
        }
      }
    ]
  },
});