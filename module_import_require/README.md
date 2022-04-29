# 개발의존성모듈과 의존성 모듈(devDependencies, dependencies)

## Dependencies

의존성이라는 뜻이다. 해당 프로젝트를 개발할 때에만 필요한 의존성을 `devDependencies` 에 정의하고 그렇지 않은 의존성은 `dependencies`에 해놓는다.  

제품의 릴리즈나 구동시 꼭 필요한 모듈의 경우 --save 옵션으로 dependencies 항목에 기록하고
제품의 개발시에 테스트를 위해서 필요한 모듈이긴 한데 실제 릴리즈시에는 필요없는 모듈의 경우 --save-dev로 devDependencies 항목에 넣는경우

* "dependencies": 프로덕션 환경에서 응용 프로그램에 필요한 패키지.
* "devDependencies": 로컬 개발 및 테스트에만 필요한 패키지.

devDependencies와 dependencies 외 peerDependencies 도 있는데, 이 항목은 해당 프로젝트를 운용하기 위해 항목에 포함된 의존성이 필요한 항목을 리스트하기 위해 있는 항목이다. 예를 들어 peerDependencies 항목에 A 라는 패키지가 지정되어 있고 A의 버전이 3.0.0으로 지정되어 있다면 해당 프로젝트를 사용하기 위해 A@3.0.0이 필요하다는 소리이다. 호환되지 않는 버전을 사용한다면 작동하지 않는다는 소리다.

해당 패키지가 설치되지 않는 상태에서 어플리케이션이 실행된다면 우리의 프로젝트는 실행되지 않고 오류를 뱉는다. npm 버전 7부터는 의존성 충돌이 일어나면 peerDependencies 항목에 있는 의존성을 자동으로 설치한다.

webpack dev모듈로 설치하기
```shell
npm install webpack webpack-cli --save-dev
```
package.json

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  // 개발 의존성 모듈이 생성됨
  "devDependencies": {
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  }
```

# import, require

require은 NodeJS에서 사용되고 있는 CommonJS키워드이고, import는 ES6에서 새롭게 도입된 키워드이다. 

두개의 키워드 모두 하나의 파일에서 다른 파일의 코드를 불러온다는 동일한 목적을 가지고 있지만, 약간에 차이가 있다.

```js
const foo = require('fooModule');

import foo from fooModule;

import { pi, square, Person } from './lib.js';

import * from './lib.js';

import { pi as PI, square as sq, Person as P} from './lib.js';
```

* 첫번째 코드는 `require`키워드를 사용하여 여타 다른 변수 할당하듯 모듈을 불러온다.
* 두번째 코드는 `import`키워드를 사용하여 좀더 명시적으로 모듈을 불러오고 있다.
* 세번째 코드는 export 한 식별자 이름으로 import 한다.
* 네번째 코드는 export한 모든 식별자를 모아 import 한다.
* 다벗번째 코드는 export한 식별자 이름을 변경하여 import한다.



## CommonJs모듈 시스템

ES6모듈 시스템을 점점 널리 사용하고 있지만 NodeJS, script 태그를 사용하는 브라우저에서는 아직 기본 모듈 시스템으로 사용되고 있기 때문에 Bable과 같은 코드 변환 도구를 사용할 수 없는 상황에서는 `require`키워드를 사용해야한다.

## ES6모듈 시스템

`import`,`from`,`export`,`default` 처럼 모듈 관리 전용 키워드를 사용해 가독성이 좋은 장점이 있다. 또한 비동기 방식으로 작동하고 모듈에서 실제로 쓰이는 부분만 불러 오기 때문에 성능과 메모리에서 유리한 측면이 있다.

# export(내보내기)

## CommonJS 

* exports : 여러개의 객체를 내보낼경우
exports 변수의 속성으로 내보낼 함수들을 세팅한다.
```js
const canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};

function usToCanadian(us) {
  return roundTwoDecimals(us / exchangeRate);
}

exports.canadianToUs = canadianToUs; // 내보내기 1
exports.usToCanadian = usToCanadian; // 내보내기 2
```

* module.exports : 하나의 객체를 내보낼경우

```js
// 내보내기
const obj = {};
obj.canadianToUs = function (canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
};
obj.usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};
module.exports = obj;
```

단 `module.exports`는 하나의 객체를 반환하는 대신 객체안에 여러개의 객체를 넣어 반환시 객체의 전체 내용을 내보낼수 있다. 

## ES6

`commonJS`에서는 내보낼 복수 객체들을 exports 변수의 속성으로 할당하는 방식을 쓰지만 ES6 에서는 import 키워드와 함께 명시적으로 선언해 준다.

이때 내보내는 변수나 함수의 이름이 그대로 불러낼 때 사용하게 되는 이름이 되기 때문에 이를 `Named Exports`라고 한다.

```js
// 내보내기 1
export function canadianToUs(canadian) {
  return roundTwoDecimals(canadian * exchangeRate);
}

// 내보내기 2
const usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate);
};
export { usToCanadian };
```

* 내보내기1 : 선언과 동시에 내보내기

* 내보내기2 : 선언후에 별도로 내보내기

모듈에서 하나만 export한다면 default 키워드를 사용할 수 있다. default 키워드를 사용하는 경우 기본적으로 이름없이 하나의 값을 export한다.

```js
export default x => x*x;
// default 키워드를 사용하는 경우 var let const 키워드는 사용할 수 없다.
export default const foo = () => x*x ; // Syntax Error
```

### import로 가져오기
ackage.json 파일을 열고, 최상위에 type 항목을 module로 설정해야 한다.
```json
package.json
{
  // 생략
  "type": "module"
  // 생략
}
```
```js
//모듈이 export한 식별자 이름으로 import
import { canadianToUs } from "./currency-functions";

//전체 가져오기
import * from "./currency-functions";
```

## webpack.conif.js 설정파일

`webpack.conif.js`는 웹팩이 실행될때 참조하는 설정 파일이다. 프로젝트 루트 폴더에 위치한다.

## build명령어 사용하기

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build" : "webpack"
  },
```

package.json안에 script 옵션에서 빌드를 만들고 작성시 해당되는 명령어를 작성해주면 된다. 즉 키 값은 터미널 창에서 쓸 명령어, 값은 실제로 동작해야하는 명령어이다. webpack build를 하기위해서 `npx webpack`을 사용했다면 `npm run build`명령어를 이용해서 같은 명령을 내릴수 있다.

이 규칙은 모든 컨트리뷰터가 동일한 공통의 스크립트 세트를 사용할 수 있도록 한다. 대부분의 npm 프로젝트에서 표준으로 사용된다.

### NPX
npx는 node 패키지를 실행시키는 하나의 도구이다.
텍스트 또한 npx는 새로운 패키지 관리 모듈이 아닌 자바스크립트 패키지 관리 모듈인 npm의 5.2.0버전부터 추가된 도구이다. 다시 말하면 npm을 좀 더 편하게 사용하기위해 npm에서 제공해주는 하나의 도구이다.

npm 레지스토리에 올라가있는 패키지를 쉽게 설치하고 관리할 수 있도록 도와주는 CLI도구

예를들어

원래는 create-react-app 할 때 npm install -g create-react-app  → global 디렉토리에 다운 받음 이제는 npx를 이용하여 npm node reposistory에 있는 것을 찾아서 다운로드 없이 가져와 쓸 수 있다. 따라서 disk space 낭비하지 않음 & 항상 최신 버전을 사용할 수 있다


### setup 하며 만났던 여러 오류들

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```
```
위 WARNING은 webpack.config.js 파일에 mode 옵션을 넣지않을경우 넣는게 좋다는것을 알려준다. mode의 인자로는 development, porduction, none을 넣을 수 있다.
```

```
Module not found: Error: Can't resolve './src' in
```

```
말그대로 모듈을 찾지 못했다는 것이다. 특히 webpack.config.js를
바보같이 exports.module을 했다.. module.exports 잘 적자 
```

```
ReferenceError: require is not defined in ES module scope, you can use import instead
```

```
ES6에서 import 문법을 사용하기 위해서 package.json 파일안에 "type":"module" 값을 넣어주어야 정상적으로 작동하는데, 웹팩을 사용할때는 넣어주지 않는다. 만약 넣게된다면 `.cjs`로 확장자를 바꿔주어야 한다.
```

```
Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
```

```
패키지를 private로 표기하고 main 항목을 제거하기 위해 package.json 파일을 조정해야 한다. 이것은 실수로 코드가 출시되는 것을 방지하기 위한 것이다.
```