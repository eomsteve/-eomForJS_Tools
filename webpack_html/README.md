# html파일에 번들적용

이전엔 js파일들을 번들링하여 main.js파일을 만드는데 그쳤다면. 이번엔 html파일안에 main.js번들을 적용시켜 js파일을 실행하는 과정까지 넣는 작업을 하였다.

main함수의 위치를 webpack.config.js파일에서 명시해 주었기 때문에 html문서안에 지정된 경로의 main.js파일을 불러와 잘 동작하는지 확인하였다.

파일구조
```
webpack_html
  |- package.json
  |- package-lock.json
  |- webpack.config.js
  |- /dist
    |- main.html
  |- /src
    |- index.js
    |- /math
      |- math.js
```

이번에 새로 알게된 것은, 번들 소스의 값이 변경될 때마다 빌드를 하는방법을 하는게 아닌 webpack의 watch 속성을 이용해서 디버깅을 쉽게 할수 있었다. watch속성을 이용하면 바뀔때마다 빌드가 새롭게 되기 때문에 좀더 편하게 개발하는 느낌이 들었다.

만약 페이지가 새로고침 안되는게 불만일경우 

```
npm install --save-dev webpack-dev-server 
```

위 패키지를 깔아 사용할 수 있지만 다른 extansion으로 대체가 가능한것 같다.
