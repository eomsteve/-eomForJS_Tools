# webpack mode

웹팩에는 3가지 모드가 있다. development에서는 강력한 소스 매핑, localhost 서버에서 라이브 리로딩이나 핫 모듈 교체 와 같은 기능을 원한다면. production에서는 소스맵을 가볍게 한다던가 asset 최적화, load time 향상과 같은 번들의 최적화에 초점이 맞춰져 있다. 그래서 웹팩 공식홈페이지에서는 각각의 모드에 따라서 webpack의 설정을 다르게 하는것을 강력히 권장하고 있다.

### string-replace-loader

문자열을 치환하는 로더는 아래의 로더를 사용했다. yarn으로 설치를 해야하는데, 여기서는 npm install string-replace-loader를 사용했다. (잘 작동함!)
[string-replace-loader](https://github.com/Va1/string-replace-loader)

## 분리안하고 webpack.config.js 에서 처리하기

파일을 분리하지 않고 스크립트 빌드시 들어오는 환경변수의 값에 따라 string을 치환시킨다.

`package.json`
```json
"build:production": "webpack --config webpack.config.js --env production --mode production",
```
--env 설정을 이용해서 webpack 빌드시 환경변수를 지정할수 있다. 할당을 하는 = 연산을 사용하지 않고 빌드를 진행하게 되면 --env 이후 오는 변수에 true가 할당이 된다.

`webpack.config.json`
```js
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
          // string 를 치환 시키는 로더
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
```

## 파일 분리 해서 처리하기

두 환경을 분리하더라도 두 환경에서 공통적으로 쓰이는 설정은 계속 유지시켜주어야 한다. 분리된 설정을 합치기 위해서 `webpack-merge`유틸리티를 사용한다. 유틸리티를 사용하게 되면 같은 코드를 각각에 복사 붙여넣기 할 필요가 없다.

```shell
npm install --save-dev webpack-merge
```

이후 webpack.config.js 파일을 분리한다.

```
  stringReplaceLoader
  |- package.json
  |- production.json
  |- validation.json
  |- package-lock.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
  |- /node_modules
```

### webpack.common.js

이 파일은 두 버전빌드에 동시에 쓰이는 부분을 사용한다. entry, output등을 정의해서 빌드할때 공통적인 부분을 기입한다.

```js
const path = require('path');

module.exports = {
  entry : './src/index.js',
  output: {
    filename: 'main.js',
    path : path.resolve(__dirname, 'dist')
  },
}
```



### webpack.prod.js


프로덕션 버전의 빌드를 진행할때 사용한다.
 기존 config.js와 다른점은 common 부분이 사라지고 prod.js 를 빌드 호출할때 common 부분도 같이 호출하기 위해 위에서 받은 webpack-merge를 사용한다. 

```js
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
```

### webpack.dev.js

개발 버전 빌드시 사용한다.

```js
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
```