# Node Module install

노드 모듈을 설치하기 위해서 npm을 초기화 시킨다.
```shell
$npm init -y
# 디폴트값으로 초기화 
```

생성된 package.json 파일이 있는 폴더에서 
```shell
$ npm install moment
```
`npm install <package name>` 명령어를 통해 모듈을 설치한다. 이때 모듈을 설치함에 있어 필요한 node_modules 폴더가 생성되고 `package.json`파일이 수정된다.

수정전
```json
{
  "name": "nodemodules",
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

moment 모듈 설치 후 package.json

```json
{
  "name": "nodemodules",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "moment": "^2.29.2"
  }
}
```

하단에 디펜던시, 그아래 moment 모듈에 대한 버전정보가 들어가있다. 

이때 `package-lock.json`파일동안 생성된다.

### package-lock.json

`package-lock.json`은 package.json 만으로는 정보가 부족하기 때문에 생성된다. 

기존 package.json에 저장된 버전 정보들을 범위를 지정해 저장하게 되는데, 협업시 package.json의 버전의 정보가 변경되면 버전을 범위로 관리하기 때문에 같은 package.json을 install 했음에도 불구하고 서로 다른 node_modules를 생성사는 경우가 발생한다.

이를 방지하기위해 package-lock.json 이 만들어졌고, package-lock.json은 의존성 트리에 대한 정보를 가지고 있으며, package-lock.json파일이 작성된 시점의 의존성 트리가 다시 생성될 수 있도록 보장한다.

    1. package-lock.json 파일은 의존성 트리에 대한 정보를 모두 가지고 있다.
    2. package-lock.json 파일은 저장소에 꼭 같이 커밋해야 한다.
    3. package-lock.json 파일은 node_modules 없이 배포하는 경우 반드시 필요하다.


소스코드를 가져와 npm package를 설치하는 경우 package.json 혹은 package-lock.json 파일이 들어있는 폴더에서 `npm install`명령어를 실행하면 디펜던시 안의 모듈들을 설치하고, node_modules 폴더가 자동으로 생성됩니다.

### 모듈 삭제

`npm uninstall <package-name>` 명령어를 통해 원하는 패키지를 삭제할수 있습니다. 이 명령어를 실행하면 package.json의 디펜던시 또한 사라지게 된다.

npm 패키지가 글로벌로 설치되어 있다면 -g 옵션을 넣어 삭제 해야한다.