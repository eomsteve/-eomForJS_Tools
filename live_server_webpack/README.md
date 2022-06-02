# webpack live server
npm init 후 밑 명령어 실행하여 webpack-cli, webpack-dev-server, html-webapkc-plugin 설치

```
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```


### html-webpack-plugin

`HtmlWebpackPlugin`은 webpack 번들을 제공하는 HTML 파일 생성을 단순화한다. 이 플러그인은 매번 컴파일에 해시로 된 파일 이름을 가진 webpack 번들에 유용하다. HTML파일을 생성하거나 lodash탬플릿을 사용하여 제공하거나 나만의 로더를 만들어 사용할 수 있다.


```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

위 플러그인을 사용하면, 아래의 내용을 포함하는 dis/index.html 파일이 생성된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

### webpack dev server

`webpack-dev-server`는 애플리케이션을 빠르게 개발하는데 사용할 수 있다. 프로젝트 루트에 있는 public/ 디렉터리의 모든것을 gzip으로 압축하고 제공한다.

```js
const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    //gzip
    compress: true,
    port: 3000,
  },
};
```