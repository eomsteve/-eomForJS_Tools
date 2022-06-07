const path = require('path');
const SERVER_URL_PRO = require('./production.json').SERVER_URL;
const SERVER_URL_VAL = require('./validation.json').SERVER_URL;

module.exports = (env) => { 
  let replacementString;
  if (env.production == true){
    console.log('Production: ', env.production);
    replacementString = SERVER_URL_PRO;
  }else{
    console.log('Validation: ',true);
    replacementString = SERVER_URL_VAL;
  }
  return {
    entry : './src/index.js',
    module: {
      rules: [
        {
          test: /index\.js$/,
          loader: 'string-replace-loader',
          options: {
            search: 'SERVER_URL',
            replace: replacementString,
          }
        }
      ]
    },
    output: {
      filename: 'main.js',
      path : path.resolve(__dirname, 'dist')
    },
  }
}
