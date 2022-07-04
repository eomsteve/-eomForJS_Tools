# TypeScript

TypeScript가 Javascript의 변형, 혹은 기호 라는것을 들어봤을겁니다. TS와 JS의 관계는 프로그래밍 언에서 굉장이 독특한 관계입니다. 그래서 TS와 JS관계를 이해 하는것은 TS학습에도 도움이 됩니다.

### js의 역사

Javascript(ECMAScript)는 처음에 브라우저를 위한 스크립팅 언어로 만들어졌습니다. JS가 처음나왔을때 JS로 수십줄 이상의 코드를 작성하리라 예상하지 못하고 나왔습니다. 초기 웹에서는 수십줄 이상의 JS코드가 실행될때 많은 시간이 걸렸습니다. 하지만 시간이 흘러 JS 사용자가 늘게 되고 엔진을 최적화 시키고, 확장하여 현대 웹 어플리케이션 플랫폼을 만들어냈습니다.

요약하자면, JS는 우리에게는 빠른 사용을 위해 설계되었으며 수백만 줄의 어플리케이션들을 작성하기 위해 만들어진 완벽한 도구가 되었습니다.

하지만 모든 언어가 그렇듯 언어만의 특색, 이상하다고 느껴지는점들이 자바스크립트에게도 존재했는데 강제 형변환이나 존재하지 않는 프로퍼티 접근이 이 예시입니다. 다른 언어에서는 컴파일중에 오류를 표출할만한 상황이지만 자바스크립트는 이를  "알아서" 처리해 주었습니다.

```js
const obj = { width: 10, height: 15 };
// 왜 이게 NaN이죠? 철자가 어렵네요!
const area = obj.width * obj.heigth;
```



작은 프로그램을 작성할때는 이런 이상한 점들이 화를 돋구지만 관리는 가능합니다. 허나 수백 수천줄의 어플리케이션을 작성할 때는 반복되는 이상한점들이 큰 문제로 다가옵니다.

### TS : 정적 타입 검사자

프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것은 정적 검사라고 합니다. 어떤것이 오류인지와 어떤 것이 연산되는 값에 기인하지 않음을 정하는것이 정적 타입 검사입니다.

TS는 프로그램을 실행하기 전에 값의 종류를 기반으로 프로그램의 오류를 찾습니다. 

```tsx
// @errors: 2551
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
```

그럼 TS와 JS는 어떤관계일까요:?

## Syntax

TS는 JS문법이 허용되는 JS의 상위 집합 언어입니다. 

```tsx
// @errors: 1005
let a = (4
```

`)`가 없으므로 문법오류

TS는 독특한 구조때문에 JS를 코드오류로 보지 않는다. 즉, 어떻게 작성되어있늕지 모르지만 작동하는 JS코드를 TS파일에 넣어도 잘 작동합니다.

## Types

그러나 TS는 다른종류의 값들을 사용할 수 있는 방법이 추가된, 타입이 있는 상위 집합니다. 그래서 위의 `obj.heigth`는 타입을 잘못 사용해서 생긴 오류입니다.

또 다른 예시로 아래와 같은 JS코드가 브라우저에서 실행될 때 다음과 같은 값이 출력됩니다.

```js
console.log(4 / []); //Infinity
```

구문적으로 옳은(syntactically-legal) 위 코드는 JavaScript에서 `Infinity`가 출력됩니다. 그러나 TS는 배열로 숫자를 나누는 연산이 옿지 않다고 판단하고 오류를 발생시킵니다.

```ts
// @errors: 2363
console.log(4 / []);
```

TypeScript의 타입 검사자는 일반적인 오류를 최대한 많이 검출하면서 올바른 프로그램을 만들 수 있게 설계되었습니다. 

JavaScript 파일의 코드를 TypeScript 코드로 옮기면, 코드를 어떻게 작성했는지에 따라 *타입 오류*를 볼 수 있습니다. 이는 코드 상의 문제이거나, TypeScript가 지나치게 보수적인 것일 수 있습니다. 위와 같은 오류를 제거하기 위해 가이드는 다양한 TypeScript 구문을 추가하는 방법을 보여줍니다.

## Erased Types

TypeScript의 컴파일러가 코드 검사를 마치면 타입을 *삭제해서* 결과적으로 "컴파일된" 코드를 만듭니다. 즉 코드가 한 번 컴파일되면, 결과로 나온 일반 JS 코드에는 타입 정보가 없습니다.

타입 정보가 없는 것은 TypeScript가 추론한 타입에 따라 프로그램의 *특성*을 변화시키지 않는다는 의미입니다. 결론적으로 컴파일 도중에는 타입 오류가 표출될 수 있지만, 타입 시스템 자체는 프로그램이 실행될 때 작동하는 방식과 관련이 없습니다.

# TS for JS programer

JS에는 이미 `string`, `number`, `object`, `undefined` 같은 원시 타입을 가지고 있지만, 코드에 작성될때 일관되게 원하는 자료형이 할당되었는지는 미리 확인해주지 않습니다. 

하지만 TS는 JS언어를 알고있으며 대부분의 타입을 생성합니다. 

### 타입 정의하기

JavaScript는 다양한 디자인 패턴을 가능하게 하는 동적 언어입니다. 몇몇 디자인 패턴은 자동으로 타입을 제공하기 힘들 수 있는데 (동적 프로그래밍을 사용하고 있을 것이기 때문에) 이러한 경우에 TypeScript는 TypeScript에게 타입이 무엇이 되어야 하는지 명시 가능한 JavaScript 언어의 확장을 지원합니다.

다음은 name : string과 id: number를  추론 타입을 가진 객체를 생성하는 예제입니다.

```js
const user = {
  name: "Hayes",
  id: 0,
};
```

이 객체의 형태를 명시적으로 나타내기 위해서는 `interface` 로 선언합니다.

```tsx
interface User {
  name: string;
  id: number;
}
```

이제 변수 선언 뒤에 `: TypeName`의 구문을 사용해 JavaScript 객체가 새로운 `interface`의 형태를 따르고 있음을 선언할 수 있습니다.

해당 인터페이스에 맞지 않는 객체를 생성하면 TypeScript는 경고를 줍니다.

```tsx
// @errors: 2322
interface User {
  name: string;
  id: number;
}

const user: User = {
    // name != username
  username: "Hayes",
  id: 0,
};
```

JavaScript에서 사용할 수 있는 적은 종류의 원시 타입이 이미 있습니다. : `boolean`, `bigint`, `null`, `number`, `string`, `symbol`, `object`와 `undefined`는 인터페이스에서 사용할 수 있습니다. TypeScript는 몇 가지를 추기해 목록을 확장합니다. 예를 들어, `any` (무엇이든 허용합니다), [`unknown`](https://typescript-kr.github.io/en/play#example/unknown-and-never) (이 타입을 사용하는 사람이 타입이 무엇인지 선언했는가를 확인하십시오), [`never`](https://typescript-kr.github.io/en/play#example/unknown-and-never) (이 타입은 발생될 수 없습니다) `void` (`undefined`를 리턴하거나 리턴 값이 없는 함수).

: [Interfaces and Types](https://typescript-kr.github.io/play#example/types-vs-interfaces) - `interface`를 우선적으로 사용하고! 특정 기능이 필요할 때 `type`을 사용해야 합니다.

# 타입스크립트 사용하기

타입스크립트도 node packagemanger에서 패키지를 관리하기 때문에 `npm init -y`를 통해 package.json을 생성해준다. 그뒤에 `npm i -D typescript` 명령어를 통해 타입스크립트를 설치하고 tsc --init 명령어를 사용, tsconfig.json파일을 생성한다.

* npm init
* npm i -D typescript
* tsc --init

tsconfig파일이 생성된 뒤로는 ts파일을 js파일로 cli명령어인 tsc를 통해 컴파일할 수 있다.

```ts
//컴파일 전
const a = "hello world";
console.log(a);
```

* 컴파일 후
```js
"use strict";
const a = "hello world";
console.log(a);
```

### tsconfig.json 설정

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```


## webpack ts 설정하기

기본적인 웹팩을 설치 후 TS컴파일러와 로더를 설치한다

```shell
npm install --save-dev typescript ts-loader
```

webpack.config.js 파일을 아래와 같이 설정한다.

```js
const path = require('path');

module.exports = {
  mode:"development",
  entry : './scripts/index.ts',
  // loader이므로 모듈, 룰 설정
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path : path.resolve(__dirname, 'dist')
  },
};
```