interface NickNameMaker {
  name: string;
  num: number;
  init(this: NickNameMaker): () => {};
}
// 추가된부분
function makeNickName(name: string, num: number): NickNameMaker;
function makeNickName(name: string, num: string): string;
function makeNickName(
  name: string,
  num: number | string
): NickNameMaker | string {
  if (typeof num === 'number') {
    return {
      name,
      num,
      init: function (this: NickNameMaker) {
        return () => {
          return this.name + this.num;
        };
      },
    };
  } else {
    return '이름 다음에는 숫자를 입력해 주세요';
  }
}

const getNickName = makeNickName('mjo', 123).init();
console.log(getNickName());
