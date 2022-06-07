const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {
  console.log('Production: ', env.production); 
  return merge(common, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /index\.js$/,
          loader: 'string-replace-loader',
          options: {
            search: 'SERVER_URL',
            replace: 'PRODUCTION_SERVER_URL',
          }
        }
      ]
    },
  });
}