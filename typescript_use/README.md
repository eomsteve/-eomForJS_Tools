| 타입의 종류 | JavaScript | TypeScript |
| ----------- | ---------- | ---------- |
| 수          | Number     | number     |
| 불리언      | Boolean    | boolean    |
| 문자열      | String     | string     |
| 객체        | Object     | object     |

타입 스크립트는 기본적으로 다음과 같은 타입을 가지고 있다

```tsx
boolean
number
string
object
array
tuple
enum
any  // 모든 타입을 허용,  정해지지 앟은 변수 지정 가능
void // 값이 없음
null
undefined
unknown
never // 도달이 불가능한 코드
```

## 변수 타입 선언

자바스크립트에서는 문자열인 타입의 변수를 숫자 타입으로 변경하는것이 가능하다. 자바스크립트에서 `let`으로 선언한 변수는 해당코드에서 그 값이 언제든 변경될수 있음을 암시한다.

자바스크립트는 런타임 도중에 변수 타입이 변경되었을때 오류가 발생하지 않는데, 타입스크립트는 타입을 강제적으로 선언해 줌으로써 런타임이 아닌 컴파일러 단계에서오류를 알 수 있다. 이는 생산성의 확실한 향상으로 이뤄진다.

### 타입 표기

변수를 선언한 후 콜론 뒤에 타입과 함께 세미콜론을붙여준다. 이를 `타입주석`이라 한다.

```tsx
let name : string;
let age : number
```

타입 주석을 통해 타입을 선언해준 변수는 선언된 타입과 다른 타입의 변수값으로 변경하려 하면 오류가 발생한다.

```ts
let address : string;
let age : number = 28;

address = 0; // error: The Type 'number' is not assignable to type 'string'
age = '제주' // Error!!!
```

### 타입 추론

타입 표기는 자바스크립트와의 호환성을 위해 생략될 수 있는데 타입 선언이 없으면 컴파일러가 타입을 추론한다.

즉 타입스크립트 컴파일러가 우측 값에 따라 타입을 지정해 주는것이 `타입 추론`이다. (JS 방식과 같음)

```ts
let a = true; //Boolean
let b = 'hello'; // b의 타입을 string으로 판단
let name :string = "이름"; // 타입을 중복해서 지정
```

마지막 코드처럼, 타입 스크립트 컴파일러가 타입을 유추 할 수 있는 것에 중복하여 명시적으로 타입을 지정하는것은 피해야 한다.

### any

any타입은 모든 타입의 값을 지정할 수 있다. 하지만 타입 체크를 확실히 하기 위해 any를 사용하는것은 지양된다.

```ts
//모든 값 저장 가능
let a : any = 0;
a = true;
a = 'typescript';
a = {};
// No Error;
```

### never

never 타입은 절대 반환을 하지 안흔 함수에 사용된다.도달 되지 않는 코드를 나타내며 무한으로 반복되는 함수나 오류를 발생시기키 위해 존재하는 함수가 그 예가 될수 있다.

```ts
const neverTest = () =>{
    while(1){
        console.log('함수가 무한히 실행된니다.');
    }
}
```

위 함수의 타입은 never이다.

```ts
function sayName(value:string):string{
    if (typeof value === "string"){
        retrun value;
    }else{
        retrun value;
    }
}
```

위 코드에서 value 절에 마우스를 올려 값을 확인해 보면, value :naver 라고 떠 never 타입임을 확인할 수 있다.

### 유니온 타입

하나의 변수에 지정할 수 있는 타입이 여러 개일때 유니온 타입을 사용한다.

```ts
let a :string | number;
```

변수 a는 문자열과 숫자 타입만 허용한다. 예외 처리의 필요성이 사라지는 장점이 있다. 두개 이상의 타입을 가지는 변수는 `any`타입이 아닌 유니온 타입을 사용하는것이 관습이다.

### 커스텀 타입

타입스크립트는 커스텀 타입을 만들 수 있다. `type`키워드를 사용하여 새로운 타입을 선언할 수 있고 타입 별칭(type alias)를 사용하여 이미존재하는 타입에 다른 이름을 붙여 사용할 수도 있다.

```ts
type Centimeter = number;
type Kilogram = number;

type Student = {
    name : string;
    heigth : Centimeter;
    weight : Kilogram;
}

let student : Student = {
    name : 'steve',
    heigth : 170,
    weight : 70
}
```

만약 student 변수를 초기화 할때 프로퍼티 값이 누락된다면 에러 메시지가 뜬다.

```ts
let stu : Student = {
	height = 167,
	weight = 55
}

//property 'name' is missing in type '{heigth : number; weigth :number;}' but required in type Student
```

해당 프로퍼티가 필수가 아닌 선택사항이라면 타입을 만들때 프로퍼티 이름 뒤에 물음표를 붙여 해당 프로퍼티가 조건부 프로퍼티임을 선언해 준다.

```ts
type Student = {
    name? : string; //선택사항
    heigth : Centimeter;
    weight : Kilometer;
}

let stu1 : Student ={
    heigth : 170,
    weight : 70
}//OK
```

### 배열

타입스크립트에서는 배열 타입을 `array type`과 `generic array type` 두 가지 혙애로 나눈다. 

#### 배열

요소 타입으로 number, string, boolean뿐만 아니라 class, interface도 사용할 수 있다. 배열 요소가 모두 number 타입이면 `number[]`와 같이 선언해야 한다.

```ts
let list : number[] = [1, 2, 3, 4, 5];
```

* `number[]` : 배열 타입
* number : 요소 타입
* `[1, 2, 3, 4, 5]` : 배열 요소, 배열의 길이는 5

```ts
let fruits : string[] = ["apple", "banana", "melon"];
```

배열요소가 모두 string타입 

```ts
fruits.push("orange");
// result : ["apple", "banana", "melon", "orange"];
```

여러개의 타입으로 제약하기 위해 유니온 타입을 사용한다.

```ts
let member : (string | number | boolean | null)[] = ["hello", 12, true, null];
```

#### 제네릭 배열

자바 문법과 비슷한

```ts
let str : Array<string> = ["안녕하세요"];
```

제네릭 배열 타입은 `Array<Type>`형태로 선언하는데 이때 Type은 뜻 그대로 타입을 의미한다

```ts
let str2 : Array<string | number> = ["hello", 12];
let str3 : typeof str2 = ["steven", 20]; //타입 쿼리
```

제네릭 배열 력시 타입을 숫자나 문자열 타입으로 제약하려면 유니온 타입으로 선언한다.

그리고 타입을 참조할 때는 타입 쿼리를 이용한다.  `typeof` 연산자를 사용하는데 참조할 변수의 타입을 얻어와 타입을 지정한다.

```ts
let arr : Array<()=> string> = [() => "eom", ()=> "seonghyun"];
console.log(arr[0]()); // result : eom
```

제네릭 배열 타입은 객체타입도 디정할 수있는데 위처럼 배열 요소를 익명함수로도 받을 수 있다.

## 튜플

```ts
let member : [string, number] = ["steve", 29];
console.log(member);
```

# 객체 타입

타입스크립트와 자바스크립트의 차이중 하나는 타입스크립트는 객체를 선언할때 어떤 타입인지 명확하게 정의해야 한다.

### 객체선언

객체는 변수 이름 옆에  : 오른쪽에 {} 또는 `new`를 사용하여 정의한다. 타입을 지정하는 위치로 객체 생성이 아닌 타입스크립트가 기능을 활용해 작성한다.

```ts
const student1 :object = {};
const student2 : {}; // any타입
```

타입을 object로 선언하면 typeof 연산자가 기본적으로 모든 타입을 나타낸다. 최상위 타입이기 때문에 그다지 유용하지 않다.

```ts
let student:{
    name : string,
    grade : number,
};

student = {
    name : '학생1',
    grade : 3
};
```

타입을 지정해주면 해당 타입의 객체만 해당 변수에 저장될 수있다고 알려주는 것이다. 

### 타입 추론

앞서 객체를 먼저 만들어 필드와 자료형을 지정 했다면 표기를 하지 않고도 객체를 만들 수 있다.

```ts
const student  = {
    name : 'jaden',
    grade : 2
};
```

타입의 표기가 없는 경우 값을 기반으로 타입을 유추해낸다. 

### 옵션 속성

```ts
const cat : { type : string,  age?: number} = {
    type : 'persian'
};
cat.age = 2;
```

선택적 속성을 사용하면 해당 필드는 선택적으로 사용할 수 있어 객체 생성시 지정하지 않고 나중에 값을 추가할 수 있다. 객체를 선언할때 필드 뒤에 ?를 붙인다.

### 인덱스 시그니처

```ts
const student : { [index: string]: number} = {};
student.id = 0722561
student.id = "jose" // Error
```

빈 객체를 만들 때 필드의 자료형을 지정하지 않은 채 인덱스를 사용하면 된다. student 라는 객체에 id(string)로 지정하고 해당 값은 숫자로 추가할 수 있다.

## 열거형

비슷한종류의 아이템을 함께 묶어서 표현할 수 있는 수단으로 숫자 또는 문자열 값 집합에 이름을 부여할 수 있는 타입이다.

```ts
enum Class {
    Rock,
    Scissors,
    Paper
}
```

열거형의 이름은 첫 문자를 대문자로 쓰고 키의  첫 문자도 앞 글자를 대문자로 표시하는것을 권장한다. 객체에서 사용하는 것과 동일하게 점 또는 괄호 표기법으로 열거형의 값에 접근할  수 있다. 열거형에서 문자열로 매핑, 문자열에서 숫자로 매핑하는 두가지 방법이 있다.

### 숫자 열거형

자동으로 열거형의 각 맴버에 적절한 숫자를 추론해 할당하지만, 값을 명시적으로 설정할 수 있다. 상수를 선언만 한다면 숫자 열거형으로 인식해 타입 스크립트에서 자동으로 각 맴버에 적절한 숫자를 추론해 할당한다.

```ts
enum Class {
	Rock = 0,
    Scissors = 100 + 1, // 101
    Paper, // 102
}
```

초기화 하는데 계산된 값도 사용할 수 있다. 타입 스크립트의 추론으로 인해 Paper의 값은 작성하지 않아도 Scissor의 값을 영향받아 102가 된다. 생략보다는 숫자 형이란느것을 명시해 주는것이 좋다.

### 문자열 열거형

```ts
enum Class {
    Rock = 'ROCK',
    Scissors = 'SCISSORS',
    Paper = 'PAPER'
}
```

문자열 또는 다른 문자열 열거형으로 상수를 초기화 해 주어야 한다. 숫자 열거형처럼 값이 증가하진 않지만, 값을 읽기 쉽다는 장점이 있다.

### 이중 열거형

```ts
enum Game {
	Rock = 'ROCK',
    Scissors = 2,
    Paper
}
```

문자열과 숫자값을 혼합하여 사용할 수 있다.

###  const enums

```ts
const enum Game{
	Rock,
	Scissors,
	Paper
}
```

값으로는 문자열 리터럴로만 지정할 수 있으며 숫자 열겨형은 안전성을 해치는 문제를 초래한다. 왜냐하면 값이나 키로 열겨형에 접근할 때 존재하지 않는 키에도 접근할 수 있기 때문이다. 그렇게 되면 불안정한 결과를 초래하기에 이를 해결하기 위해서는 `const enum`을 사용하는것이 좋다.

# 함수

함수에서 JS와 TS의 문법을 비교하며, 타입을 어떻게 설정하는지 알아보도록 하자

## 함수의 기본 타입 선언

TS는 각 매개변수 뒤에 `:타입`을 입력해주고 괄호 뒤에는 함수가 반환하는 `:타입`을 입력한다. 반환하는 타입이 없을 경우 `:void`로 입력한다.

### 반환 값이 있는 경우

```ts
function sum(number1 : number, nubmer2 : number) : number {
    return number1 + number2;
}
console.log(sum(10, 20)); // 30
console.log(sum(10, 20, 30)); // Error ! : 파라미터의 계수가 많음
console.log(sum(10)); // Error ! : 파라미터의 계수가 적음
```

```ts
function isChildren(age : number) : boolean {
    return age <= 19;
}
```

### 반환 값이 없는 경우

반환값이 없는 경우 void를 기재한다.

```ts
function sum(number1 : number, number2 : number) : void {
    console.log(number1 + number2);
}
```

### 선택적 매개변수 '?'

JS에서는 매개변수의 개수만큼 인자를 넘기지 않아도 된다. 하지만 함수의 기본 타입을 선언하게 되면 JS의 특성과는 다르게 에러가 발생한다. 

TS에서는 위와같은 JS의 특성을 살리기 위해 선택적 매개변수가 등장한다. 변수명 앞에 `?` 를붙이면 그 매개변수는 Optional 한 값이 되고 Optional 한 값은 인자를 넘기지 않아도 에러가 발생하지 않는다.

```ts
function moring(name? : string) : string {
    return `Good morning ${ name || 'every one'}`;
}

console.log(morning()); // result : Good morning every one
console.log(morning('eom')); // result : Good morning eom
console.log(morning(123)); // Error : Type Error!
```

TS의 매개변수 타입 절차는 거치면서 JS 의 특성은 살리는 모습을 확인할 수 있다. 

선택적 매개변수가 필수 매개변수보다 앞에 위치하면 에러가 발생한다. 만약 선택적 매개변수를 앞에 위치하고 싶다면 '?'를 제거하고 '| undefined'를 선언하면 된다.

```ts
function moring(name : string | undefined, time : number) : string {
    return `Good morning ${ name || 'every one'}, Time is ${time || 8}`;
}
console.log(morning()); // Error !
console.log(morning('eom', 7)); // result : Good morning eom, Time is 7
console.log(morning(undefined, 123)); // result : Good morning every one, Time is 123
```

## 매개변수 초기화

```ts
function sum( a: number, b: 2022) : number {
    return a+b;
}
console.log(sum(10, undefined)); // 2032
console.log(sum(10, 20 ,30)); //  Error
console.log(sum(10)); // result : 2032
```

## REST문법이 적용된 매개변수

전개 문법의 타입은 배열이기 때문에 타입을 배열로 받는다.

```ts
function sum(...numbers : number[]) : number{
    return numbers.reduce((res, number) => res + number, 0);
}
```

## this

this의 타입을 정할때는 함수의 첫 번째 매개변수 자리에 `this`를 쓰고 타입을 입력한다.

```ts
function foo(this : 타입){
	// ....
}
```

매개변수와 같이 this의 타입을 적어주지만 실제로 인자값을 받는 매개변수는 `this :타입`을 제외한 나머지임으로 햇갈리면 안된다.

```ts
interface User {
    name : string,
    age : number,
    init(this : User) : () => {};
}

let user1 : User = {
    name : 'mj',
    age : 20,
    init: function(this : User) =>{
		return this.age;    
	}
}


let getAge = user1.init();
let age = getAge();
console.log(age); // 20
```

## 콜백에서의 this

콜백함수에서 this는 콜백으로 함수가 전달되었을때 this를 구분해주어야 할 때가 있다. 

```ts
interface BrowserEL{
    addEventListener(onClick : (this: void, e : Event) => void): void
}

class Handler {
    info : string;
    conClick(this : Handler, e Event){
        // BrowerEL의 this타입은 void인데 Handler라고 타입선언하여 에러
        this.info = e.message;
    }
}

let handler = new Handler();
browserEL.addClickListener(handler.onClikc); // Error!
```

만약 `BrowerEL`인터페이스에 맞춰 `Handler`를 구현하려면 아래와 같이 변경해야 한다.

```ts
class Handler{
	info : string;
    onClick(this: void, e: Event){
        console.log('clicked!');
    }
}

let handler = new Handler();
browerEL.addClickListener(handler.onClick);
```

## 함수 오버로드

JS는 동일한 매개변수지만 타입을 다르게 받을 수 있다. TS에서 그 특징을 구현하기 위해 함수 위에 매개변수의 다른타입을 적어둘 수 있다. 전달받은 매개변수의 개수나 타입에 따라 다른동작을 하게하는것을 오버로드라 한다.

###  매개변수의 개수는 동일하지만, 타입이 다른 경우

```ts
function sum(a:number , b:number) : number ;
function sum(a:string, b:string) : string;

function sum(a : any , b : any) : any{
    return a+b;
}

console.log(sum(1, 2)); // 3
```

### 매개변수의 개수는 다르지만, 타입은 같은 경우

````ts
function sum(a:number) : number ;
function sum(a: number, b: number) : number;
function sum(a:number, b:number, c:number) : number;

function sum( a: number, b?:number, c?:number): number{
    return a + (b||0) + (c||0);
}
````

### 매개변수의 개수와 타입이 다른 경우

```ts
interface NickNameMaker{
    name: string,
    num : number,
    init(this: NickNameMaker) : () => {};
}

function makeNickName(name : string, num :number | string) :NickNameMaker | string {
    if (typeof num === "number"){
        return {
            name,
            num,
            init: function (this:NickNameMaker){
                return () => {
					return this.name + this.num;
                }
            }
        };
    }else{
        return "이름 다음에는 숫자를 입력해 주세요";
    }
}

const getNickName = makeNickName("mjo", 320).init(); // Error
console.log(getNickName());
```

위처럼 작성하면 값을 판별하기가 어렵다 따라서 아래와 같이 작성해야 한다.

```ts
interface NickNameMaker{
    name: string,
    num : number,
    init(this: NickNameMaker) : () => {};
}
// 추가된부분
function makeNickName(name: string, num:number) :NickNameMaker;
function makeNickName(name: string, num: string): string;
function makeNickName(name : string, num :number | string) :NickNameMaker | string {
    if (typeof num === "number"){
        return {
            name,
            num,
            init: function (this:NickNameMaker){
                return () => {
					return this.name + this.num;
                }
            }
        };
    }else{
        return "이름 다음에는 숫자를 입력해 주세요";
    }
}

const getNickName = makeNickName("mjo", 320).init(); 
console.log(getNickName());
```

# tsconfig

타입스크립트 ts파일을 js파일로 변환시 어떻게 변환할 것인지 세부 설정을 의미한다.

tsc --init 명령어를 통해서 만들수도 있는데 초기 설정은 아래와 같이 생성된다.


```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

요약하면 아래 옵션만 황성화 되어있는 상태로 만들어지게 된다.
```txt
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true
```


유용하게 쓸만한 ts 설정들을 조금 간추려 보면 아래와 같다.

```json
{
 "compilerOptions": {

  "target": "es5", // 'es3', 'es5', 'es2015', 'es2016', 'es2017','es2018', 'esnext' 가능
  "module": "commonjs", //무슨 import 문법 쓸건지 'commonjs', 'amd', 'es2015', 'esnext'
  "allowJs": true, // js 파일들 ts에서 import해서 쓸 수 있는지 
  "checkJs": true, // 일반 js 파일에서도 에러체크 여부 
  "jsx": "preserve", // tsx 파일을 jsx로 어떻게 컴파일할 것인지 'preserve', 'react-native', 'react'
  "declaration": true, //컴파일시 .d.ts 파일도 자동으로 함께생성 (현재쓰는 모든 타입이 정의된 파일)
  "outFile": "./", //모든 ts파일을 js파일 하나로 컴파일해줌 (module이 none, amd, system일 때만 가능)
  "outDir": "./", //js파일 아웃풋 경로바꾸기
  "rootDir": "./", //루트경로 바꾸기 (js 파일 아웃풋 경로에 영향줌)
  "removeComments": true, //컴파일시 주석제거 

  "strict": true, //strict 관련, noimplicit 어쩌구 관련 모드 전부 켜기
  "noImplicitAny": true, //any타입 금지 여부
  "strictNullChecks": true, //null, undefined 타입에 이상한 짓 할시 에러내기 
  "strictFunctionTypes": true, //함수파라미터 타입체크 강하게 
  "strictPropertyInitialization": true, //class constructor 작성시 타입체크 강하게
  "noImplicitThis": true, //this 키워드가 any 타입일 경우 에러내기
  "alwaysStrict": true, //자바스크립트 "use strict" 모드 켜기

  "noUnusedLocals": true, //쓰지않는 지역변수 있으면 에러내기
  "noUnusedParameters": true, //쓰지않는 파라미터 있으면 에러내기
  "noImplicitReturns": true, //함수에서 return 빼먹으면 에러내기 
  "noFallthroughCasesInSwitch": true, //switch문 이상하면 에러내기 
 }
}
```

