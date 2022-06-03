## webpack hash filename

output filename 에 filename: "[name].[contenthash].js", 처럼 저장할 이름 [name]과 hash 할 부분의 이름을 넣어 작성할 수 있다.

### hash 종류
전부 내용 변경 없으면 동일한 hash

* hash : build 시 마다 변경, 각 chunk도 같은 hash 값을 가진다.
* chunkhash : webpack entry를 기반으로 정의되어 고유의 hash 값을 가진다 (변경이 일어난 entry의 hash만 변경)
* contenthash : 추출된 content에 의해 계산되는 hash 값을 가짐,contenthash는 각 파일의 내용을 기반으로 hash값을 생성한다. (변경이 일어난 file의 hash만 변경)

### hash slice
[hash:8] 처럼 원하는 length만큼 slice 가능하다.
ex) 8c4cbfdb91ff93f3f3c5 -> 8c4cbfdb

## webpack sourcemap

`source map`은 개발하는 코드와 번들링된 코드 사이의 관계를 표현하는 데이터이다. 이 source map 이 필요한 이유는 webpack 을 사용해서 번들링을 하게 되면 작성한 코드가 하나의 JS 파일로 만들어 지기 때문이다. 번들링된 코드로 부터 소스코드를 유추하는것은 비효율적이기 때문에 개발하는 코드와 번들링된 코드를 연결하는 source map이 등장하게 된다. **즉, 디버깅을 원할하게 하려면 필요하다**

### .map 파일 구조

소스맵 파일은 JSON 형식으로 되어 있다.

* version : 양수로 소스맵의 버전을 의미하고 항상 제일먼저 나와야 한다.
* file : 변환된 파일명
* sourceRoot : 옵션값으로 소스 파일을 가져올 경로의 루트를 재조정하는데 사용
* sources: mappings에서 사용할 원본 소스 파일명의 배열이다.
* sourceContent : 옵션값으로 소스의 내용을 담고 있어야 하면 sources의 파일명으로 파일을 가져오지 못했을 때 사용하는 용도이다. null로 지정하면 반드시 소스피알이 필요하다.
* names : mappings에서 사용할 심볼 이름이다.
mappings는 인코딩된 매핑 데이터의 문자열이다.

webpack:// 은 프로토콜이나 URL이 아니고, 그냥 웹팩이 임의로 파일 이름에 붙인 접두사 같은 것이다.

## Path Alias

상대경로를 사용함으로서 생기는 생대 경로 헬을 피하기 위해 `Path Alias`를 사용한다.

```js
import { someFuncs } from "../../../../../../Commons/SomeUtilFuncs";
```

위와같은 경로헬을 아래와 같이 만들어보고자 한다!

```js
import { someFuncs }from "@Commons/SomeUtilFuncs";
```
