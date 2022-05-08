const path = require('path');

module.exports = {
  mode : 'none',
  entry : './src/index.js',
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename : 'main.js',
    // assetModuleFilename: 'images/[name][ext]',
  },
  module :{
    rules : [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(jpe?g|gif|png)$/i,
      //   type: 'asset/resource'
      // },
      {
        test: /\.(jpe?g|gif|png)$/i,
        type:'asset',
        parser:{
          dataUrlCondition:{
            maxSize : 6 * 1024
          }
        },
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      }
    ]
  }
}