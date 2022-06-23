function add(num1: string | number, num2: string | number): number {
  if (typeof num1 === 'string') {
    num1 = parseInt(num1, 10);
  }
  if (typeof num2 === 'string') {
    num2 = parseInt(num2, 10);
  }

  return num1 + num2;
}

console.log(add('1', '2'));

// 스택 클래스

class Stack<T> {
  private _arr: T[] = [];
  private _top: number = -1;

  constructor(private _size: number) {}

  isEmpty(): boolean {
    return this._arr.length === 0;
  }

  isFull(): boolean {
    return this._arr.length === this._size;
  }

  push(value: T): void | string{
    if (this.isFull()) {
      return 'Error : The stack is full';
    }
    this._arr.push(value);
    this._top++;
  }

  pop(): T | string{
    if (!this.isEmpty()){
      this._top--;
    }
    return this._arr.pop() || 'Error : The stack is empty';
  }

  top(): T | string {
    return this._arr[this._top] || 'Error : The stack is empty';
  }

  display(): void {
    this._arr.forEach( (value : T) => {
      console.log(value);
    })
  }
}


const stack = new Stack<number>(5);

stack.push(1);
stack.push(2);
// stack.display();
console.log(stack.top());
console.log(stack.pop());
