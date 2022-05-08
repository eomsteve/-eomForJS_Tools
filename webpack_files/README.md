## module, plugin

플러그인은 어떤 특정한 하나의 문제를 해결하기 위한 컴포넌트 즉, 사람들이 자주 사용할만한 기능들을 일일이 구현할 필요 없이 필요한 기능들만 그때 그때 찾아서 사용할 수 있도록 만들어 놓은 것,

모듈은 대개 클래스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 로 불린다. 
> 개발에서 모듈과 라이브러리는 동일한 의미로 불린다. 둘다 결론적으로는 자주 사용하게 되는 코드를 하나의 함수나 클래스 단위로 묶어 코드를 재사용하는 용도가 같기때문

* 웹팩에서 쓰이는 플러그인 : webpack으로 변환한 파일에 추가적인 기능을 더하고 싶을때 사용한다. 플러그인은 번들된 결과물을 처리한다. 
* loader? : loader는 플러그인과 달리 파일을 해석하고 변환하는 과정에서 모듈을 처리한다.


## webpack files

webpakc5 이전에는 번들에 필요한 파일을 처리할 때 아래의 로더를 사용했었다.

* `raw-loader` : 파일을 문자열로 가져올 때
* `url-loader` : 파일을 data URI 형식으로 번들에 인라인 추가 할 때
* `file-loader` : 파일을 출력 디렉터리로 내보낼 때

하지만 이제는 위 로더들을 대체하기 위해 애셋 모듈이 생겼고 4개의 모듈이 추가되었다.

* asset/resource는 별도의 파일을 내보내고 URL을 추출한다. 이전에는 file-loader를 사용.
* asset/inline은 애셋의 data URI를 내보낸다. 이전에는 url-loader를 사용.
* asset/source는 애셋의 소스 코드를 내보낸다. 이전에는raw-loader를 사용.
* asset은 dataURI와 별도의 파일 내보내기중에서 자동으로 선택한다. 이전에는 에셋 크기를 제한하는 url-loader를 사용했다.

### asset/resource


```json
output : {
    ...
    assetModuleFilename: 'images/[name][ext]',
  },
module :{
    rules : [...,
      {
        test: /\.(jpe?g|gif|png)$/i,
        type: 'asset/resource'
      }
    ]
  }
```

test에 적힌 경로와 확장자들을 선택하여 `assetModuleFilename`에 정의된 출력 디렉토리로 파일명을 설정해서 내보낼 수 있다.


* 특정 디렉터리에 애셋을 내보낼때 출력 파일명을 사용자 정의하는 경우

```
module :{
    rules : [...,
      {
        test: /\.(jpe?g|gif|png)$/i,
        type: 'asset/resource'
      },
      //추가부분
     {
       test: /\.html/,
       type: 'asset/resource',
       generator: {
         filename: 'static/[hash][ext][query]'
       }
     }
    ]
  }
```
위 설정을 이용하면 html 파일을 출력 디렉터리 내의 `static`디렉터리로 내보내게 된다. 

`Rule.generator.filename`은 output.assetModuleFilename`과 같으며 `asset`및 `asset/resource` 모듈에서만 동작한다.


### asset

webpack은 기본 조건에 따라 resource와 inline 중에서 자동으로 선택한다. 이 기준은 보통 크기로 이루어 지는데 inline을 통하게 되면 base64로 인코딩된 URIdata로 파싱되게 된다.

예를들어 6kb 미만의 파일은 resource로 이상의 파일을 inline 모듈로 처리가된다.

webpack 설정의 module rule 단계에서 Rule.parser.dataUrlCondition.maxSize 옵션을 설정하여 크기에 대한 조건을 변경할 수 있다.


```json
 module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
       parser: {
         dataUrlCondition: {
           maxSize: 6 * 1024 // 6kb
         }
       }
      }
    ]
  },
```