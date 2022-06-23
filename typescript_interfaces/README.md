# type 키워드와 interface

## 타입 별칭(Type Alias)
타입에 대한 별칭을 제공하며 재사용 할 수 있다.
타입 별칭은 정의한 타입을 참고할 수 있게 이름을 지어주는 것이지, 새로운 타입을 생성하는것이 아니다.

`type 별칭 = 타입`

```ts
const food : string = "banana";
const food : string = 1; //Error!

type Food = string;

const myFood : Food = "apple";
const myFood2 : Food = 1; //Error!
```
타입의 자리에는 원시값 이외에도 유니온, 튜플, 함수 객체 등 인터페이스 레벨의 복잡한 타입이 올 수 있다.

```ts
// 문자열
type Name = string;
const userName : Name = "eom";

// 문자열 리터럴
type MyName : "jade";
const userName2 : MyName = "sheom"; //Error!

// 숫자 타입
type MyNumber : number;
const id : MyNumber = 123; 

// 유니온 타입
type MyText = string | number;

// 문자열 유니온
type Texts = 'hello' | 'world';

// 숫자 리터럴 유니온 
type MyNumbers = 1 | 2 | 3 | 4 | 5;

// 함수 유니온 
type MyFunc = (()=> string | ()=> void);

//인터페이스 유니온
interface A {a: number;}
interface B {b: number;}
type MyInterface = A | B;

// 튜플 타입
type MyTuple = [string, number];

// 제네릭 타입
type MyGenerics<T> = {
  name : T;
}

// 객체 타입
type User = {
  name : string,
  age : number
}

//함수의 파라미터
function getUser (user: User){}
let newUser : User ={
  name : "철수",
  age : 20
}

getUser(newUser);

//함수 타입
type AddNumber = ( x: number, y: number) => number;
let addNumber : AddNumber = (x, y) => x + y;
```

## 인터페이스

타입 별칭과 비슷하게 새로운 타입을 정의하는 또다른 방법. 객체, 함수, 함수의 파라미터, 클래스 등에 사용할 ㅅ ㅜ있으며 상호 간에 정의한 약속 혹은 규칙을 의미한다.

`interface 인터페이스 이름 : { 속성 : 타입; }` 으로 정의한다.

### 인터페이스 속성

객체의 스펙
```ts
// 객체의 스팩(속성과 속성의 타입)
interface User {
  name : string;
  age : number;
}

let user1 : User {
  name : "철수",
  age : 20
}

let user2 = {} as User;

user1.name = "영희";
user1.age = 22;
```

함수 타입
```ts
// 함수의 스펙
interface AddNumber {
  (x : number, y : number) : number;
}

let addNumber : AddNumber = (x, y) => x + y;

addNumber(10, 10); // 20
```
인터페이스를 인자로 사용할 때 정의한 프로토타입의 조건을 만족한다면 인자로 받는 객체의 프로퍼티 개수나순서는 같지 않아도 된다.
```ts
interface user {
  name : string;
  age : number;
}

function getAge(obj : User){
  console.log(obj.age);
}

let person = {
  name : "철수",
  age : 20,
  gender : "male"
}

getAge(person); // 20
```

인터페이스를 정의할 때 옵션 속성을 사용하면 그 속성을 사용하지 않아도 된다. `속성? : 타입;`과 같이 속성 뒤에 `?`를 붙여 사용한다.

```ts
// 옵션 속성을 사용하지 않은 경우
interface User {
  name : string;
  age :number;
}

function getAge(obj: User){
  console.log(obj.name);
  console.log(obj.age);
}

// 객체가 인터페이스를 만족하지 못함
let person = {
  name : "철수"
};

getAge(person); //Error!
```

```ts
// 옵션 속성을 사용한 경우
interface User{
  name: string;
  age : number;
  gender? : "male"|"female";
}

function getAge(obj : User){
  console.log(obj.name);
  console.log(obj.age);
}

let person = {
  name : "철수",
  age : 20
}

getAge(person); 
```
`getAge` 함수의 인자로 받는 `person`의 프로퍼티에는 `gender`가 없지만, 인터페이스에 이를 옵션 속성으로 정의했기 때문에 오류가 나지 않는다.

**읽기 전용**

인터페이스를 사용하여 객체를 생성할때, 값을 할당한 후 변경할 수 없는 속성을 의미한다. `readonly 속성: 타입;` 과 같이 속성앞에 `readonly`를 붙여 사용한다. 
```ts
// 읽기 전용 속성
interface User {
  readonly name : string;
}

let person : User = {
  name : 'John'
}

person.name = "eom"; //Error!
```

`ReadonlyArray<T>`타입을 사용하여 읽기 전용 배열을 생성할 수 있다.

```ts
//읽기전용 배열
let Users : ReadonlyArray<string> = ["철수", "영희"];

Users.splice(0, 1); //Error!
Users.push("현지"); // Error!
Users[0] = "???"; //Error!
```

**클래스 타입**
`implements`로 미리 정의된 인터페이스를 채택하여 클래스를 정의할 수 있다.
```ts
interface User{
  name : string;
  age: number;
  getAge(age:number) : void;
}

class newUser implements User {
  name : string = "eom";
  age: number = 20;
  getAge(age : number){
    console.log(this.age);
  }
  constructor(){}
}

let user1 = new newUser();
user1; // {name : "eom", age : 20}
```

```ts
interface User {
  name: string;
  age : number;
  getAge(age:number) : void;
}

class newUser implements User {
  constructor(public name: string, public age: number){}
  getAge(age: number){
    console.log(this.age);
  }
}

let user1 = new newUser("영희", 20);
user1; // {name:"영희", age: 20}
```

## interface와 type의 차이

인터페이스와 타입의 가장 큰 차이는 타입의 확장 가능, 불가능 여부이다.

### 선언적 확장

인터페이스는 새로운 속성을 추가하기 위해 같은 이름으로 재 정의하여 확장할 수 있다. 이를 선언적 확장이라고 한다.

```ts
interface User {
  name : string;
}

//같은 이름으로 정의하면 자동으로 확장된다.
interface User{
  age : number;
}
```

타입은 같은 이름으로 재 정의할 수 없다.

```ts
type User = {
  name : string;
}

type User = {
  age : number;
} // Error!
```

### 인터페이스의 확장

`extends`를 사용하여 인터페이스간 확장이 가능하다.

```ts
interface User {
  name : string;
}

interface UserInfo extends User {
  age : number;
}

let person : UserInfo = {
  name : "철수",
  age : 20
};
```

인터페이스 여려개 상속받기
```ts
interface User{
  name : string;
}

interface Age{
  age : number;
}

interface UserInfo extends User, Age {
  gender : string;
}

let person : UserInfo = {
  name: "철수",
  age : 20,
  gender : "male"
};
```

인터페이스는 타입을 상속받을 수 있지만 리터럴 타입은 불가능하다. 또한 유니온 연산자를 이용한 타입은 `extends`, `implements` 할 수 없다.

```ts
interface UserInfo2 extends string {} // Error!
```

### 타입의 확장

타입은 `extends`대신 인터섹션 `&`을 사용하여 확장할 수 있다. 인터페이스 처럼 타입을 상속받아 확장하는 개념이 아닌 새로운 타입을 정의하는 것이다 (교차타입!)

```ts
// 타입의 확장
type User = {
  name : string;
};

type UserInfo = User & {
  age : number;
};

let newUser : UserInfo = {
  name : "철수",
  age : 20
}
```

타입 -> 인터페이스 확장

```ts
interface User {
  name : string;
  age : number;
}

type UserInfo = User & {
  gender : string;
};

let person : UserInfo = {
  name : "철수",
  age : 20,
  gender : "male"
}
```

## 인터페이스 vs 타입

TypeScript의 공식 문서에서는 가능하다면 인터페이스를 사용하고, 인터페이스로 표현할 수 없거나 유니온, 튜플을 사용해야 하는 상황이라면 타입을 사용하도록 권장하고 있다!

# 유니온 타입과 교차타입

## 유니온 타입
유니온 타입은 TS가 가지는 타입중 하나로 하나의 값이 여러개의 타입을 가지는 경우 사용한다. OR연산자처럼 A이거나 B이다 라는 의미다.

### 유니온 타입 지정

파이프 문자를 추가해 여러 개의 타입을 지정 해 줄수 있다. `A | B`로 표현된다.

```ts
let text : string | number = 22;
text = '22';
```

### 인터페이스 유니온

유니온 타입이 인터페이스를 연결했을때 모든 타입의 공통 속성에만 접근할 수 있다.

```ts
interface Ujin{
  name : string;
  age : number;
}

interface Dabin{
  name : string;
  character : string;
}

function combine(person : Ujin | Dabin){
  person.name; // 정상 동작
  person.age; // 타입 오류 
  person.character; // 타입 오류
}
```

`combine`함수를 호출할때 어떤 타입이 올지 알 수 없기 때문에 어떤 타입이 들어오든 오류가 안나는 방향으로 타입을 추론하게 된다. 모든 타입의 공통적인 속성에만 접근할 수 있기 때문에 `person.name`은 정삭작동 하지만, `person.age`와 `person.character`는 타입 오류가 난다. 이때 필요한것이 유니온 타입가드 이다. 

## 유니온 타입가드

유니온 타입으로 선언한 변수나 객체를 사용해야 할 경우 그대로 사용하면 오류가 날 수 있다. 타입 스크립트는 유니온 타입을 이해할 뿐 유니온타입 내에 무엇이 있는지는 분석하지 못한다.

이런 경우 런타입 검사를 추가하여 타입이 어느쪽에 해당하는지 판정을 해줘야 한다. 이러한 과정을 타입 가드라고 한다.

### 원시 타입 식별

원시 타입은 `typeof`연산자를 이용해 타입 검사를 할 수 있다.

```ts
function combine(input1 : number | string, input2 : number | string){
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number'){
    result = input1  + input2;
  }else{
    result = input1.toString() + input2.toString();
  }

  return result;
}

console.log(combine('hello', 'world')); // hello world
console.log(combine(10, 20)); //30
```

### 클래스 객체 식별

생성자 함수를 반환하는 class 객체는 typeof로 검사하면 'object'민을 반환하기 때문에 `instanceof` 연산자를 이용해 타입 검사를 한다.

```ts
class Ujin{ }
class Dabin { }

const combine(user : Ujin | Dabin){
  if (user instanceof Ujin){
    user.good(); // user가 Ujin 클래스의 객체
  }else{
    user.bad(); // user 가 Dabin  클래스의 객체
  }
}
```

### 일반 객체 식별

타입스크립트 에서는 객체 타입을 지정할 때 인터페이스를 사용하여 객체의 모양을 지정할 수 있다.

```ts
interface Cat{
  meow():string
}

interface Dog{
  bow():string
}

function checkType(pet : Cat | Dog){
  if ("meow" in pet){
    (pet as Cat).meow();
  }else{
    (pet as Dog).bow();
  }
};
```

if문의 조건을 통해서 타입을 체크 했지만 if 문 내부에서 as문을 통해 한번 더 어떤 객체인지 알려 주어야 한다.

### null 체크

문자열의 값이 존재하지 않는 경우에 사용한다. string | null 이라고 유니온 타입을 지정했을때 값이 null 이어서 string으로 사용할 수 없거나 null이 아닌 경우 예외 처리를 하고 싶을 때 사용한다.

```ts
function nullCheck(val : string | null) : number{
  if (val != null){
    return null
  }else{
    return 0;
  }
}
```

## 교차 타입

교차 타입은 유니온 타입과 비슷하지만 다른 방식으로 동작한다. 

교차 타입은 주어진 타입들의 특성을 모두 가진다는것 이 차이점이다.

예를 들어 type D = A & B & C & 와 같은 타입을 정의하면 D는 A, B, C 의 속성 모두를 가진다.


```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```

# TypeCasting 과 TypeAssertion

타 언어에서 타입 케스팅이란 형 변환을 의미한다. 타입스크립트에서도 특정 타입임을 단언해야하는 상황이 있는데 특별한 검사나 데이터 재구성을 하지 않기 떄문에 TypeCasting과는 별개의 개념이다.

타입 어설션이란 시스템이 추론한 타입의 내용을 변경하는 것이다. 실행시간에 어떤 동작이 일어날 것인지를 내표하는 TypeCasting보다 TypeAssertion이 더 적합한 표현이기 때문에 헷갈리지 않아야 한다. 타입 어설션은 `<>` 표기법과 `as`연산자를 이용한 두 가지 방법이 있다.

### `< >`표기법

`<type>` 을 변수 앞에 작성한다.

```ts
let val : any;
let foo1 = <string>val;
```

### `as` 연산자

`as type`을 변수 뒤에 작성한다.

```ts
let val : any;
let foo1 : val as number;
```

`< >` 표기법은 `JSX`문법에서 헷갈리기 때문에 `as`연산자 사용을 권장한다.

# 제네릭

홀 화살 괄호를 사용하고 타입의 T를 사용한다.

```ts
function helloGeneric<T>(message : T) : T{
  return message;
}
console.log(helloGeneric("hey"));

// 위 함수는 다음과 같다.
// function helloGeneric(message: "hey") : "hey"{
// return message;
//}
```

`message`라고 받은 인자를 `T`라고 지정한다. 그렇게 되면 `helloGeneric`이라는 함수 내에서 `T`라고 하는것을 기억하게 된다.

그리고 return 값을 `T`로 지정하면 된다. 즉, `T`의 타입에 따라 함수의 타입이 결정된다.

```ts
console.log(helloGeneric("hey").length);
// (property) String.length : number
// Returns the length of a String object.

console.log(helloGeneric(30).length);
// any
// result : property 'length' dose not exist on type '30'.

```

`length` 는 문자열의 길이 즉, number  타입을 반환하기 때문에 콘솔을 확인하면 number 를 반환하는 것을 알 수 있다. 또한, 숫자를 넣으려고 시도하면, 자동완성기능에 number 메서드를 확인하고 `length`를 인식하지 못하는 것을 알 수 있다.

제네릭의 장점은 `T`를 변수처럼 사용해 Type 을 지정해 줄 수 있다. `any`는 모든 것을 반환하고 제네릭은 지정해서 사용하는 차이점을 가진다. 

`any`는 들어오는 `input`에 따라 달라지는 타이핑을 할 수 없지만 제네릭은 가능하다.

```ts
function helloGeneric<T, U ,K> 

// 화살괄호 내에는 T뿐만 아니라 2개, 여러개를 포함 시킬 수 있다. T, U, K는 함수 내에서 유효한 제네릭이다.
```

```ts
function helloBasic<T>(message : T) : T{
  return message;
}

helloBasic<string>("hey");
// function helloBasic<string>(message : string) : string
helloBasic(36);
```

위 함수에서 제네릭을 가져다 써서 변수처럼 지정해 쓰는 방식과 그렇지 않은 방식이 있다. 
위와같이 제네릭을 쓰지 않으면 <T> 가 자동적으로 추론이 된다. 추론 규정에 따라서 T 가 `36`이 된다.

`36` 이면 number로 출력이 되어야 한다고 생각하겠지만 TS는 가장 좁은 법위의 타이핑을 `36`을 넣게 되면 T 자체는 `36` 그 차제가 된다. 결과물인 return type 도 `36`이 된다. 

그러니, 넣어서 사용하면 <T> 뒤의 인자가 제한이 되고, 넣지 않고 사용하면 <T> 가 추론된다고 이해 하면 된다.

```TS
function helloGeneric<T>(message : T) : T{
  return message;
}

helloGeneric<string>('hey');
// function helloGeneric<string>(message : string) : string
helloGeneric<string>(39); // error
```

```ts
helloGeneric(36);
// function helloGeneric<36>(message : 36) : 36
```

```ts
function helloGeneric<T, U>(message : T, comment : U) : T{
  return message;
}

helloGeneric<string>('hey'); // Error : Expected 2 type arguments, but got 1.
helloGeneric(36); // Error : Expected 2 type arguments, but got 1

helloGeneric<string, number>('hey', 12);
// function helloGeneric<stringm number>(message: string, comment :number):string

helloGeneric(21, 31);
// function helloGeneric<21, number>(message:21, comment: number) : 21
```

또한, 위 예제와 같이 `T`뿐만 아니라 더 많은 인자를 넣어줄 수 있다. 현재, `U`를 리턴 타입에 사용하지 않고 있기에 의미가 없긴 하지만 `T`와 조합해서 사용하면 의미가 있을 수 있다.

위와 같이 두 가지 제네릭을 사용하는 경우엔 인자를 `U`까지 채워라는 에러 메시지가 발생하는 것을 볼 수 있다.

string, number로 `T`, `U`를 채워 주었고, 인자로 "hey"와 12를 넣어주니 에러가 사라졌다. 또한 변수를 지정하지 않은 방식 또한 21, 31을 넣어줌으로써 T, U를 21, 31로 만들어 주었다.


# declare

declare 키워드는 컴파일러에게 해당 변수나 함수가 이미 존재한다는 것을 알리는 역할을 한다. 다른 영역의 코드에서 declare로 선언된 해당 변수나 함수를 참조할 수 있으며 declare로 선언된 부분은 JavaScript로 컴파일 되지 않는다.

### 사용예시

컴파일러가 인식하지 못하는 자바스크립트 파일을 웹 사이트에 추가한다고 가정한다. 해당 스크립트 파일은 실행되면서 api메서드를 생성하고 이를 글로벌 스코프에 있는 fooSdk식발자에 할당한다.

만약 TS 코드에서 fooSdk.doSomething()을 호출한다면 컴파일러는 해당 변수가 존재하는지 알지 못하기에 컴파일 에러를 발생시킨다.

이때 declare키워드를 이용하면 해당 변수의 존재와 타입을 알릴 수 있다. 컴파일러는 해당 선언문을 다른 코드의 정적 타입을 위해 사용할 뿐 javascript 로 컴파일 하지 않는다.

```ts
declare const fooSdk = { doSomething : ()=> boolean}
```

같은 맥락에서 동적으로 생성되는 class 의 프로퍼티에도 declare키워드를 선언할 수 있다. 컴파일러는 해당 프로퍼티를만나도 코드 어딘가에 해당프로퍼티를 생성하는 코드가 있을것이라고 추측하며 에러를발생시키지 않는다.

## .d.ts파일 (선언 코드만 담긴 파일)

구현부가 아닌 선언부만을 작성하는 용도의 파일을 의미한다. JS코드로 컴파일 되지 않는다. skipLipCheck 프로퍼티가 false라면 다음 규칙들을 강제한다. (true여도 지키는 것이 좋다.)

이파일에 작성되는 `declare namespace` 블록과 `declare module` 블록의 필드들에는 `export` 키워드가 기본으로 붙는다. 즉 굳이 또 붙여줄 필요가 없다.


### 전역 변수와 전역 함수에 대한 타입 선언
해당 타입스크립트 파일에서 사용할 순 있지만 선언되어 있지 않은 전역 변수나 전역 함수는 아래와 같이 타입을 선언할 수 있다.

```ts
// 전역 변수
declare const pi = 3.14;

// 전역 함수
declare namespace myLib {
  function greet(person: string): string;
  let name: string;
}
myLib.greet('캡틴');
myLib.name = '타노스';
```