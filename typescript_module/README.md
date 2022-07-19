# 타입스크립트에서 외부 라이브러리 사용하기

## moment 라이브러리

```shell
npm install moment --save
```

moment.js 라이브러리는 날짜 관련 라이브러리중 **가장 많이** 사용되던 라이브러리 이다. 너무 큰 사이즈 차지, Tree shaking을 지원하지않음, mutable 한 구조 등의 단점이 새로운 JavaScript의 흐름에 맞지않아 더이상의 업데이트를 하지 않기로 한 이후로 더이상의 업데이트가 없는 상태이다.

```
import moment from "moment";
```

위와같이 선언 해 사용한다.

## 타입스크립트에서 사용하기

위 import 부분을 ts파일에서 사용하면 해당 라이브러리는 타입 선언 라이브러리를 지원하지 않기 때문에
`'moment'이(가) 선언은 되었지만 해당 값이 읽히지는 않았습니다.ts(6133)` 라는 오류를 발생한다.

### d.ts파일로 직접 모듈화하기

1. 타입 스크립트 설정 파일 `config.json`에서 typeRoots옵션을 지정해 주어야 한다.

```json
{
  "compilerOptions": {
    ...
    "typeRoots": ["./node_modules/@types", "types"] // 기본 값 : ./node_modules/@types
  },
  ...
}
```
typeRoots는 타입 정의를 참조할 곳을지정하는 옵션이다. 설정하지 않았을 대 기본값은 `./node_modules/@types`이고 추가적으로 정의할 수있다. 위 코드에서는 보통 사용하는 경로인 ./types로 지정하였다.

2. 추가적으로 정의한 폴더인 types하위에 타입을 정의하고자 하는 라이브러리 이름을 가진 폴더를 생성하고, 생성한 폴더에 실질적으로 타입을 정의하는 `index.d.ts`를 생성하여 타입을 정의하면 된다.

```bash
📦types
 ┗ 📂moment.js
 ┃ ┗ 📜index.d.ts
```
위와같은 폴더 구조가 완성된다.

* types/moment.js/index.d.ts
```ts
declare module 'moment.js' {
  
}
```

이렇게 설정하고 나면 ts파일에서도 moment라이브러리를 사용할 수 있게 된다.!@