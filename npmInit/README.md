## package manager

### 모듈
분리되어 독립적으로 동작하는 소스코드, 어떠한 기능만을 빼놓은 느낌
모듈화 한다 ▶ 큰 덩어리의 코드를 작게 분리해서 의존성을 제거해 독립적으로 움직이게 하는 것이다.

### 패키지
하나의 돌아갈 수 있는 프로그
이 안에 라이브러리와 프레임워크가포함되어있다.
코드의 배포를 위해 사용되는 코드의 묶음 
* 컴파일한 소프트웨어의 바이너리
* 환경 설정(configuration)에 관련된 정보
* 의존(dependency)에 관련된 정보

>라이브러리와 유사한 개념이다. 패키지는 배포를 위한 코드의 묶음이라면,
>라이브러리는 코드의 작성을 위해 사용되는 코드의 묶음

### 패키지 매니저
패키지 매니저란 패키지를 관리하는 작업을 자동화, 안전 처리하기 위해 사용되는 도구이다. 패키지 관리란? 패키지를 설치, 업데이트 수정, 삭제하는 작업을 뜻한다.

즉, 소프트웨어의 의존성이나 버전 정보를 관리한다.

패키지의 의존성 관리
패키지간의 의존성 관리를 할 수 있어야 한다. 어떠한 패키지 A가 B와 C에 의존적이면, 패키지 매니저가 이를 알고 함께 설치해야 한다는 뜻 대부분 특정 버전에 의존적이므로 호환 가능한 버전의 패키지가 설치되어야 한다.

| Language | Package manager | Software repository |
| --- | --- | --- |
| Python | pip | PyPI |
| PHP | Composer | Packagist |
| Node.js | NPM, Yarn | NPM, Yarn |
| Java | Maven, Gradle | Maven |
| Ruby | RubyGems, Bundler | RubyGems, Bundler |
Dependency란?

코드에서 두 모듈 간의 연결.
객체지향 언어에서는 두 클래스 간의 관계라고도 말함.
일반적으로 둘 중 하나가 다른 하나를 어떤 용도를 위해 사용함.

## 시멘틱 버전(Major, Minor, Patch), 버전 범위(version range)

아래와 같은 상황에서 MAJOR.MINOR.PATCH, 의 버전 숫자를 올릴 수 있다.

1.  MAJOR version 이전버전과 호환되지 않게 API가 변경되었을 경우
2.  MINOR version 이전 버전과 호환되는 방식으로 기능을 추가하는 경우, 그외
3.  PATCH version 이전 버전과 호환되는 방식으로 버그를 고쳤을 경우

포맷은 MAJOR.MINOR.PATCH

![](https://media.geeksforgeeks.org/wp-content/uploads/semver.png)

우리가 흔히 알고있는 1.0.1버전은 상용화 되고 있는 정식 API가 버그픽스 버전이라는 뜻이 된다.

## 버전 범위

버전 버전은 안정성을 제공하기 위해 만들어졌다. 예를 들어 내가 사용중인 패키지의 의존성 패키지의 번호 변경시 매번 의존성 패키지 번호를 바꾸어 줄 필요 없이 버전을 관리할수 있다는 말이다.

#### Basic Comparators

-   1.4.0: **정확히** 1.4.0 버전을뜻한다. 다른 버전은 허용이 안된다.
-   \>1.4.0: 1.4.0 버전보다 **높은**버전을 뜻한다.
-   <1.4.0: 1.4.0 버전보다 **낮은**버전을 뜻한다.
-   \>=1.4.0: 1.4.0 버전이거나 높은버전.
-   <=1.4.0: 1.4.0 버전이너나 낮은 버전.

`whilespace`(and)와 `||`(or)를 통해 여러 버전에 대한 조합이 가능하다.

-   1.4.0 || >= 2.4.0: 1.4.0 버전, 그러나 2.4.0 보다 높은 버전도 가능하다. 즉 1.3.5 or 2.3.9 버전은 호환이 안된다.
-   1.4.0 || >=1.5.6 <2.4.0: 1.4.0 이거나 1.5.7 이상, 2.4.0 미만으로만.

#### Advanced Constructs

위에서 살펴본 연산자를 통해 버전을 제공하는 방법은 범위의 나열이 길어질 수 있기 때문에 npm에서 이런 범위를 좀더 쉽게 작성할 수 있는 다른 방법들을 제공한다.

-   \- 사용하는 Hyphen Ranges X.Y.Z - A.B.C
-   x 를 사용하는 X-Ranges 1.2.x 1.X 1.2.\*
-   ~를 사용하는 Tilde Ranges ~1.2.3 ~1.2 ~1
-   ^를 사용하는 Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4

예시

-   1.4.0–1.5.2:  1.4.0 to 1.5.2 사이의 모든 버전들.
-   1.4.x: 1.4.0, 1.4.1, 1.4.2 와 같이 Patch버전들만 허용.
-   1.x.x: Major 버전이 1인 모든 버전. 축약해서 1.x 로도 표현할 수 있다.

-   ~1.4.2: 1.4.2 부터의 패치 버전만 허용한다. 1.4.x 의 의미와 같다.
-   ~1.4: 1.4.x 의 의미와 같다.
-   ~1: 1.x.x 버전의 의미와 같다. 

-   ^1.4.0: Major 버전이 달라지지 않는 선에서 모든 버전의미한다. 즉 <2.0.0 .
-   ^0.3.4: 0.3.4 부터 Minor버전이 달라지지 않는 선에서의 버전 0.3.x와 같이 Patch 버전만을 의미한다.
-   ^0.0.3: 0.0.3 **버전만 허용**.

## npm 프로젝트 생성

### 프로젝트 초기화

npm init : 프로젝트 생성 명령어 실행 후 패키지에 대한 정보 입력

-   package name : 프로젝트 명을 기입한다.
-   version(1.0.0) : 프로젝트의 버전을 설정
-   description : 프로젝스테 대한 설명 기입
-   entery point(index.js) :  프로젝트 실행시 시작할 실행 파일 지정 
-   test command : 테스트 실행시 나오는 메시지 설정
-   git repository :  프로젝트의 깃 레포지토리 주소
-   keywords : 프로젝트 키워드
-   author : 프로젝트 작성자
-   license(ISC) : 라이센스 정보

npm init 후 각각에 대해 정보를 입력하면 아래와 같은 내용으로 package.json을 생성한다.

```
{
  "name": "seom",
  "version": "0.0.0",
  "description": "this is for npm tutorial",
  "main": "app.js",
  "scripts": {
    "test": "test command"
  },
  "keywords": [
    "tutorial"
  ],
  "author": "seom",
  "license": "ISC"
}
```

기본값이 설정되어 있기 때문에 npm install -y 명령어로 모든 질문을 스킵하고 package.json 파일을 생성할 수 있다.

```
{
  "name": "npm_tuto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

name은 폴더명으로 자동으로 만들어지고 각각의 디폴트값을 이용해 만들었다.