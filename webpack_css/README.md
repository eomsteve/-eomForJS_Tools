# webpack css

Webpack에는 `loader`기능이 있다. webpack은 기본적으로 js파일만을 로드하지 못하지만 `loader`를 사용하면 여러 타입의 파일들을 js에서 바로 사용할 수 이는 형태로 만들 수 있다. 

파일 구조
```
webpack_html
  |- package.json
  |- package-lock.json
  |- webpack.config.js
  |- /dist (배포하는 공간)
    |- index.html
  |- /src (소스파일들)
    |- index.js
    |- /math
      |- math.js
    |- /assets
      |- main.css
```

## css-loader, style-loader

### css-loader
css-loader는 css 파일들을 읽어서 js에서 사용가능한 string으로 변환시켜준다. css안에 import나 url등의 path를 읽어서 js의 import, require로 변환 시켜주는 역할을 한다.

### style-loader

style-loader는 css-loader가 반환 해준 값을 실제로 dom에  style태그로 넣어준다. style-loader없이는 css-loader는 단순히 css값을 string으로 변환시켜주는 역할만 한다.

## js 파일에 css파일 import

./src/index.js

```js
import './assets/main.css';
...
```

## webpack.config.js


```js
const path = require('path');

module.exports = {
  entry : './src/index.js',
  output: {
    filename: 'main.js',
    path : path.resolve(__dirname, 'dist')
  },
  // 모듈 추가
  module : {
    // rules 추가
    rules : [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}
```

loader들을 사용하기 위해 webpack.config.js 파일안에 module이 추가되었고 그안에 rule이 추가되어있다.

* module : 프로젝트 내의 여러 유형의 모듈들의 처리 방법을 결정한다.
* rules : 모듈이 생성될때 요청과 일치하는 규칙들의 배열
* rules.test : loader를 적용시킬 파일들을 정규식으로 명시한다.
* rules.loader : 사용할 loader들을 명시한다.
* rules.exclude : loader가 실행될 때 배제시킬 파일들을 명시한다.
* rules.query : loader는 query를 통해 매개변수 전달

즉 위의 파일을 풀어 설명하면 번들할 프로젝트에 모듈을 사용할껀데, 특정 모듈들에 대해서 처리 방법을 rules에 명시한다. 이때 rules 안에 test는 rules를 적용시킬 파일에 대한 정규식을 적고, rules.test에 해당되는 파일들을 loader로 적용시킨다. 는 뜻이다.

여러 loader를 중복해서 쓰면 오른쪽의 loader부터 읽게 된다. 이를 chaining Loader라고 한다. 스타일 로더는 순서를 지키지 않으면 오류를 내뱉는다.

1. webpack은 모듈안에 의존적인 css 파일을 검색한다.
2. 찾으면 css-loader를 실행한다.
3. css-loader는 모든 css와 그 내부의 import한 다른 css 파일을 json파일로 로드하고, style-loader에 넘겨준다.
4. style-loader는 json을 가져와서 style태그를 추가하고 index.html 파일안에 태그를 삽입한다.