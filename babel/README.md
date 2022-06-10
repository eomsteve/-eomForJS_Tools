# babel js

바벨JS(이하 바벨)은 자바스크립트의 현재 문법을 옛 문법으로 변환시켜주는 역할을 한다. 이는 과거 모던 Nodejs의 ECMAScript 문법들의 미지원 때문에 필요성이 들어왔다. 바벨은 새로운 며세를 즉시, 바로 사용할수 있도록 해주는 장점이 있고 웹 개발의 가장 큰 골칫덩어리였던 `크로스 브라우저 이슈, 레거시 브라우저 시유`를 단번에 해결했다. 오늘날 프로젝트에서 바벨을 사용하지 않는 경우는 거의 없다고 봐도 무방하다.

ES6가 등장한 지 얼마 되지 않았을 때에는 대부분의 브라우저에서 지원하지 않았기 때문에 최신 문법을 사용하고 싶어도 사용할 수 없었다.


Babel은 ECMAScript 2015+ 문법으로 작성된 코드를 ECMAScript 2015+ 를 지원하지 않는 브라우저에서도 동작하도록 코드를 변환해주는 툴이다.그 밖에도, React의 JSX, 타입스크립트의 문법 등도 변환 할 수 있다.

### 크로스 브라우징

인터넷이 보급되기 시작할때는 인터넷 익스플로어(IE)가 보급되기 시작하면서 부터였다. 지금은 크롬, 엣지, 파이어폭스, 사파리 등등 여러 브라우저가 있는데 JS의 표준이 정해지는것과 별개로 익스플로어들의 JS 파싱엔진은 각각 다른 규정을 가지고 있다. 요즘엔 크로미움 기반으로 다 통일되고 있지만 그럼에도 불구하고 각 브라우저 상황에 맞춰 가능한 문법이 있고, 사용 불가능, 지원하지 않는 문법들이 있다. 또한 IE의 지원 종료로 IE에서 최신 자바스크립트 문법이나 CSS가 작동하지 않게 되었는데 인터넷 익스플로어를 위해 따로 페이지를 작성하는것은 너무나도 비효율적이다 그래서 transpiler 인 Bable이 이를 해결해 준다. 

## polyfill

> 폴리필(polyfill)은 충전솜이라는 의미를 가지고 있습니다. ES5에 비어있는 ES6 객체, 메소드들을 충전솜처럼 폴리필이 채워줍니다

- 새로 추가된 전역 객체들(Promise, Map, Set)을 사용가능한 객체로 바꾸어주는 개념 
- 브라우저 파편화를 해결하기 위해 지원하지 않는 공백을 매꾸는 스크립트나 기타 코드를 끼워넣어줌

바벨과 폴리필은 구분되어야 하는 개념이다. 바벨이 자바스크립트가 아닌 언어를 자바스크립트로 바꿔주는 역할을 한다면, 폴리필은 자바스크립트로 읽히지만 정의되어있지 않은 객체들을 정의해주는 개념을 말한다.

예를 들어 `Promise`객체는 ES6에서 추가된 객체로, ES6 이전에서 프로미스 객체를 선언할경우 `Promise is not a function`라는 결과를 보여준다. 폴리필 개념을 이용해 Promise를 사용할 수 있도록 정의해주는 것을 바벨-폴리필 이 해줄 수 있다.

>`바벨`은 `컴파일 타임`에 코드를 트랜스파일링한다.반면 `폴리필`은 `런타임`에 등록되지 않은 메서드나 기능을 주입해준다.

### polyfill...?

바벨 7.4.0 버전 이후부터는 폴리필 대신, 바벨에 useBuiltIn 옵션을 통해서 core-js가 import된다. 따라서 @babel/polyfill은 더이상 임포트를 따로 해줄 필요가 없어졌다.

# babel을 webpack에 싸서 드셔보세요
npm init을 통해 패키지를 만들고 시작!

## babel 설치

브라우저가 ES6를 지원하든 말든 ES6를 사용하고싶으니 바벨을 설치합니다. 설치해야하는 라이브러리는 `@babel/core`, `@babel/cli` 바벨 코어는 transpiler역할을 하고, cli는 babel실행을 위함
```
npm i @babel/core @babel/cli @babel/preset-env
```
### plugin과 preset
바벨의 플러그인은 실제로 코드를 변환 시키는 기능을 담당한다. 하지만 실제로 바벨의 플러그인은 아주 세세하게 함수 하나하나로 나뉘어져 있어서 불러오기가 힘든데 이를 해결하기 위해 `preset`이 등장했다.

preset은 목적에 따라 플러그인들을 모아놓은 라이브러리다. 프리셋도 여러가지가 있는데 preset-env라이브러는 targets옵션을 이용해서 어떤 브라우저에서도 유연하게 대응할 수 있기 때문에 가장 자주 쓰인다.

`babel.conifg.json`파일을 만들어서 내가 preset을 사용하겠다는것을 선언해야 한다.

> .babelrc vs babel.config.json vs babel.config.js : 여러 프로젝트나 패키지들에 포괄적으로 바벨을 적용하고 싶을때는 babel.config.json을 사용하고 상대적인 위치로 특정 패키지에만 사용할 경우 babelrc를 사용한다.

### babel 트랜스파일링

바벨을 사용하여 ES6+ 코드를 ES5이하의 코드로 트랜스파일링하기 위해 package.json 스크립트 부분에 trans 명령어를 추가해준다. 
```
...
"script" : "babel src/ -w -d dist/"
```
위 스크립트는 src폴더에 있는 모든 ES6 파일을 트랜스파일링 한 후, 그결과물을 dist 폴더에 저장한다.

사용한 옵션 
*  -w : 타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스 파일 한다.
*  -d : 프랜스파일링된 결과물이 지정될 폴더를 저장한다.


## webpack 설치

번들러 설치

```
npm i -D webpack webpack-cli
```
webpack html plugin 설치
```
npm i -D html-webpack-plugin
```

babel 로더, core-js3 설치
```
npm i -D babel-loader core-js@3
```

이렇게만 해주면 일단 환경설정을 하기위한 환경설정은 어느정도 끝이난다. 다 설치하고 난뒤 package.json은 아래와 같다.


```json
{
  "name": "babel",
  "version": "1.0.0",
  "description": "바벨 연습하기",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "trans": "babel src/ -w -d dist/"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/cli": "^7.17.10",
    "@babel/core": "^7.18.2",
    "@babel/preset-env": "^7.18.2",
    "@babel/runtime-corejs3": "^7.18.3"
  },
  "devDependencies": {
    "babel-loader": "^8.2.5",
    "core-js": "^3.22.8",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.9.2"
  }
}
```

## 바벨과 웹팩

**바벨은 es6문법을 변환시켜주는 컴파일러, 트랜스파일러 역할을 하는것이고, webpack은 번들링을 하는것이다.** 그래서 webpack을 통해 바벨이 적용된 번들러를 만드려면 webpack.config.js에서 babel-loader를 사용해야 한다. 프로젝트에서 .babelrc 혹은 babel.config.json으로 바벨 옵션을 만들어놨는데 웹팩로더에 같은 코드를 작성하는것은 매우 비 효율적이기 때문에 파일 자체를 웹팩 로더 옵션에 추가해 준다.

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: ['web', 'es5'],
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            // 이부분에 바벨 설정옵션을 작성해 주어야 한다.
            // 파일이 있는데 왜? -> 파일로 대체
            options: {
              configFile: './babel.config.json'
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],
  devtool: "source-map",
  mode: "development",
  resolve : {
    alias : {
      '@eom' : path.resolve(__dirname, './'),
    }
  }
};
```

ie와 호환하기 위해 babel말고도 targets 속성을 webpack설정파일에 넣어주어야 한다. 컴파일 옵션같은건데 default 값으로 web이 되어있으나 es5로 명시해주지 않을경우 ie에서는 오류가 발생한다. 

### babel.config.json

```json
//babel.config.json
{
  "presets" : [
  [
    "@babel/preset-env",
    {
      //미니멈 버전
      "targets":{
        "chrome": "72",
        "ie":"11"
      },
      "modules":"cjs",
      "useBuiltIns": "usage",
      "corejs": "3.6.4"
    }
  ]
]
}
```

위 파일의 설정을 해석하면 preset설정을 하는데, 브라우저 버전은 최소한 크롬 72버전 이상이거나 ie의 경우 11이상일 경우를 대비하여 트랜스파일링 한다. polyfill 에 들어가는 corejs 버전은 3이상 버전을 사용한다. 모듈을 export 할때 commonjs의 rule을 따른다.

## 완료

파일설정과 환경설정이 위와같이 되었다면, src폴더에서 js파일을 번들링하여, dist폴더에 번들링된 파일이 생성된다. 만약 `npm run trans`명령어를 치게 된다면 번들링되는것이 아닌, 컴파일이 된다. 번들링된 js파일이 얻고싶다면 webpack명령어를 사용해야 하는데 package.json 파일 스크립트에 `"build": "webpack --config webpack.config.js"`를 추가해주고 `npm run build` 명령어를 이용하면 번들링된 파일이 나온다.