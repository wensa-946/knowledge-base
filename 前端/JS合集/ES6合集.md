## ES6 合集
::: tip 主要考察点
let 和 const 的作用域、箭头函数、解构赋值、模板字符串、Promise、迭代器与生成器、模块化导入与导出、类与继承以及 Set 和 Map 数据结构的使用。
:::

### ES6 箭头函数和普通函数有什么区别 ?
#### 定义方式
- 箭头函数使用箭头(=>)语法，省略了 function 关键字
- 括号与箭头之间不能换行
::: details 代码示例
::: code-group
```js [example.js]
// 普通函数
let fun = function (a) {
  return `我是普通函数 ${a}`;
};
// 箭头函数
let fun2 = (a) => {
  return `我是箭头函数 ${a}`;
};
```
```js [example.js]
// 执行报错：SyntaxError: Unexpected token '=>'
let fun3 = (a)
  => {  // [!code error]
  return `我是箭头函数 ${a}`;  
}; 

```
:::
#### 参数处理
- 没有参数，直接写一个空括号
- 如果参数只有一个，可以不写括号
- 如果有多个参数，就用逗号隔开，放在括号里面
::: details 代码示例
::: code-group
```js [example.js]
let fun = () => {
  console.log("没有参数");
};
```
```js [example.js]
let fun = name => {
  console.log(`只有一个参数${name}`);
};
```
```js [example.js]
let fun = (var1, var2, var3) => {
  console.log(var1, var2, var3);
};
```
:::
#### 函数体
- 如果箭头函数的函数体只需返回某个变量或者一个简单的 JS 表达式，可以省略函数体的大括号和 return 关键字。
- 如果箭头函数的函数体只有一条语句并且不需要返回值（最常见是调用一个函数），可以给这条语句前面加一个 void 关键字。
- 箭头函数最常见的用法就是用来简化回调函数，它的语法比一般的函数更简洁、清晰、快捷。
::: details 代码示例
::: code-group
```js [example.js]
// 普通函数
let sum = function (num1, num2) {
  return num1 + num2;
};
// 箭头函数：可省略大括号和return
let sum = (num1, num2) => num1 + num2;
```
```js [example.js]
let fun = () => void doesNotReturn();
```
```js [example.js]
// 正常函数
[3, 1, 9, 7, 5].sort(function (a, b) {
  return a - b;
});
// 箭头函数
[3, 1, 9, 7, 5].sort((a, b) => a - b);
```
:::
#### 箭头函数没有自己的 this 对象
> [!IMPORTANT] 箭头函数不会创建自己的 this，所以它没有自己的 this，它只会从自己的作用域链的上一层继承 this。
箭头函数捕获的是自己在定义时所处的外层执行环境的 this。所以，箭头函数中 this 的指向在它被定义的时候就已经确定了，之后永远不会改变。
::: details 代码示例
```js
var id = "GLOBAL";
let obj = {
  id: "OBJ",
  // 普通函数
  a: function () {
    console.log(this.id);
  },
  // 箭头函数
  b: () => {
    console.log(this.id);
  },
};
obj.a(); //'OBJ'--普通函数作为对象的方法调用时，this 指向它所属的对象  // [!code highlight]  
obj.b(); //"GLOBAL" --箭头函数的 this 继承它定义时所处的全局环境中的 this  // [!code highlight]
```
:::
#### call()、apply()、bind() 也无法改变箭头函数中 this 的指向
::: details 代码示例
```js
var id = "Global";
let fun1 = () => {
  console.log(this.id);
};
fun1(); //"GLOBAL"
fun1.call({ id: "obj" }); //"GLOBAL"
fun1.apply({ id: "obj" }); //"GLOBAL"
fun1.bind({ id: "obj" })(); //"GLOBAL"
```
:::
#### 箭头函数不可以当作构造函数，不可以对箭头函数使用 new 命令
箭头函数没有自己的 this 且 this 指向外层的执行环境，所以不能当作构造函数使用，如果使用 new 关键字调用则会抛出错误。
::: details 代码示例
```js
let fun = (a) => {
  return `我是箭头函数 ${a}`;
};
let newFun = new fun(1)； //报错：TypeError: fun is not a constructor // [!code error]
```
:::
#### 其他特性
- 箭头函数没有自己的 arguments 对象
  - 在箭头函数中访问 arguments 实际上获得的是它外层函数的 arguments 值。
  - 如果要用，可以用 rest 参数代替来访问箭头函数的参数列表。
  - ::: details 代码示例
    ```js
    // 普通函数
    function logArguments() {
      console.log(arguments);
    }
    // 箭头函数
    const logArguments = (...args) => {
      console.log(args);
    };
    ```
    :::
- 头函数没有原型 prototype
  - 由于箭头函数不能作为构造函数，它们也没有 prototype 属性
  - ::: details 代码示例
    ```js
    let fun = (a) => {
      return `我是箭头函数 ${a}`;
    };
    console.log(fun.prototype); // undefined
    ```
    :::
- 箭头函数不能用作 Generator 函数，不能使用 yeild 关键字
- 箭头函数没有 super 绑定在类的继承中，在类的继承中，‌普通函数可以使用 super 关键字调用父类的方法，而箭头函数不能。

### ES6 箭头函数能当构造函数吗 ?
<mark>不能。箭头函数没有自己的 this 对象，没有 argument、caller、prototype 属性，且无法通过 new 关键字调用。</mark>

#### 补充
##### 箭头函数与构造函数对比
> [!TIP] 构造函数的定义
> 在 JavaScript 中，用 new 关键字来调用的函数，称为构造函数。构造函数首字母一般大写。

创建一个构造函数：首先会创建一个新的对象，将新建的对象设置给函数中 this，在构造函数中可以使用 this 来引用新建的对象。**构造函数内部的 this 指向当前对象的实例**。<br>
而**箭头函数的 this 的指向是在定义时确定的，‌不是在调用时确定**。 从这个特性可以看出箭头函数不能作为构造函数使用。因为它们无法正确地创建和初始化新的对象实例。‌

```js
// 箭头函数
let fun = () => {
  console.log("我是箭头函数")
}
// 构造函数
function cFun(){
  console.log("我是构造函数")
}
console.dir(fun);
// fun()
//  length: 0
//  name: "fun"
//  arguments: (...)
//  caller: (...)
//  [[FunctionLocation]]: VM1569:1
//  [[Prototype]]: ƒ () 箭头函数有 Prototype (__proto__) 属性，存在原型链，有构造函数，但它没有 prototype 属性 // [!code highlight]
//  [[Scopes]]: Scopes[2]
console.dir(cFun);
// ƒ cFun()
//  arguments: null  // [!code highlight]
//  caller: null    // [!code highlight]
//  length: 0
//  name: "cFun"
//  prototype: {}  箭头函数没有 prototype 属性，无法让实例 Prototype (__proto__) 属性指向，所以箭头函数无法作为构造函数使用 // [!code highlight]
//  [[FunctionLocation]]: VM1569:5
//  [[Prototype]]: ƒ ()
//  [[Scopes]]: Scopes[2]
```
##### 箭头函数无法通过 new 关键字调用
```js
// 箭头函数
let fun = () => {
  console.log("我是箭头函数")
}
new fun(); // 报错：TypeError: fun is not a constructor // [!code error]
```

### ES6 有哪些新特性 ?
- <mark>let 和 const</mark>：具有块级作用域，`let` 用来声明变量可重新赋值，`const` 用来声明常量不可再次赋值。
- <mark>箭头函数</mark>：新的函数声明方式，语法简洁。
- <mark>模版字符串</mark>：字符串插值功能，可定义多行字符串。
- <mark>解构赋值</mark>：是一种 JavaScript 表达式，‌它允许从数组或对象中提取属性或值，‌并将这些值赋给其他变量。‌
- <mark>默认参数</mark>：函数参数可设置默认值。
- <mark>扩展运算符</mark>：可以将数组展开为逗号分隔的参数序列，或者合并多个对象或数组。
- <mark>类与模块</mark>：通过 `class` 关键字定义类，使用 `import` 和 `export` 来导入和导出模块。
- <mark>Promise</mark>：用于处理异步操作。
- <mark>Symbol 和迭代器</mark>：提供了一种新的原始数据类型和自定义迭代行为的方式。
- <mark>新的数据结构</mark>：Map、Set。
- <mark>其他</mark>：对象属性简写，属性和方法简写，提升了 JavaScript 的编码效率和可读性。
::: details 代码详解
##### let 和 const
- let 和 const 具有块级作用域，‌这意味着它们只在声明所在的代码块内有效。
  ```js
  if (true) {
    let variable = "let variable";
    const constantVariable = "const variable";
    // 正常输出
    console.log(variable); // let variable
    console.log(constantVariable); // const variable
  }
  // 写在代码块外就会报错：
  console.log(variable); // ReferenceError: variable is not defined // [!code error]
  console.log(constantVariable); //ReferenceError: constantVariable is not defined // [!code error]
  ```
- let 声明的变量可以被修改；const 声明的变量是常量，‌一旦声明后就不能被重新赋值或修改。‌
  ```js
  let variable = 'let variable';
  variable = 'new let variable'; // 允许重新赋值

  const constantVariable = 'const variable';
  // 不允许重新赋值，会报错：
  constantVariable = 'new const variable'; // TypeError: Assignment to constant variable. // [!code error]
  ```
##### 箭头函数
箭头函数提供了更简洁的语法来定义函数，并且会继承当前上下文的 this。
```js
const add = (a, b) => a + b;
console.log(add(2, 3)); // 输出 5
```
##### 模版字符串
- 用反引号 ` 包裹字符串，支持插值表达式 ${}
  ```js
  const name = 'World';
  const greeting = `Hello, ${name}!`;
  console.log(greeting); // 输出 Hello, World!
  ```
- 支持多行字符串
  ```js
  console.log(`string text line 1
  string text line 2`);
  // 正常输出：
  // string text line 1
  // string text line 2
  ```
##### 解构赋值
- 对于数组解构赋值，数组的元素是按次序排列的，变量的取值由它的位置决定。
  ```js
  const [a, b] = [1, 2];
  console.log(a, b); // 输出 1 2
  ```
- 对于对象解构赋值，如果对象中有与变量同名的属性，那么该属性值就会被赋给对应的变量。
  ```js
  const { name, age } = { name: 'John', age: 25 };
  console.log(name, age); // 输出 John 25
  ```
##### 默认参数
当定义函数时，可以为参数指定一个默认值。<br>
如果调用函数时没有为该参数提供值，那么就会使用这个默认值。<br>
如果调用函数时传了新的参数，则会使用新的值。
```js
const greet = (name = 'Guest') => `Hello, ${name}!`;
console.log(greet()); // 输出 Hello, Guest!
console.log(greet('Alice')); // 输出 Hello, Alice!
```
##### 扩展运算符
用于将数组或对象展开成一系列参数或合并多个参数为一个数组的语法特性。它由三个点号（...）表示。
```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // 输出 [1, 2, 3, 4]

const obj1 = {a: 1};
const obj2 = {b: 2};
const merged = {...obj1, ...obj2};
console.log(merged); // 输出 {a: 1, b: 2}
```
##### 类与模块
- 引入了类的概念，通过 `class` 关键字定义类，支持面向对象编程。
  ```js
  class Person {
    constructor(name) {
      this.name = name;
    }
    greet() {
      console.log(`Hello, ${this.name}!`);
    }
  }
  const person = new Person('John');
  person.greet(); // 输出 Hello, John!
  ```
- 引入模块的语法，使用 `import` 和 `export` 来导入和导出模块。
  ```js
  // module.js
  export const name = 'John';
  export const greet = () => console.log('Hello, John!');

  // main.js
  import {name, greet} from './module.js';
  console.log(name); // 输出 John
  greet(); // 输出 Hello, John!
  ```
##### Promise
Promise 是 ES6 中用于处理异步操作的新特性。<br>
它是一个对象，具有三种状态：初始状态（pending）、已完成（fulfilled）和已失败（rejected）。<br>
当状态从 pending 变为 fulfilled 或 rejected 时，会触发相应的回调函数。<br>
Promise 提供了两种处理错误的方式：在 then 方法中传递两个回调，其中第二个是错误回调；或者使用 catch 方法来捕获异常。
```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done!'), 1000);
});
promise.then(result => console.log(result)); // 输出 Done!（一秒后）
```
##### Symbol 和迭代器
引入了 Symbol 数据类型和迭代器协议，提供了一种新的原始数据类型和自定义迭代行为的方式。
```js
const symbol = Symbol('unique');
console.log(symbol); // 输出 Symbol(unique)

const iterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
for (const value of iterable) {
  console.log(value); // 输出 1 2 3
}
```
##### Map、Set 等新的数据结构
- Map 对象是键值对的集合。Map 中的一个键只能出现一次。
  ```js
  const map = new Map();
  map.set('key', 'value');
  console.log(map.get('key')); // 输出 value
  ```
- Set 是 ES6 中引入的一种数据结构，用于存储不重复的元素。
  ```js
  const set = new Set([1, 2, 3]);
  set.add(2); // 重复添加无效
  console.log(set); // 输出 Set { 1, 2, 3 }
  ```
##### 对象属性简写，属性和方法简写
提升了 JavaScript 的编码效率和可读性
```js
const x = 1;
const y = 2;
const obj = {x, y}; // 属性简写
console.log(obj); // 输出 {x: 1, y: 2}

const method = () => console.log('method');
const obj2 = {
  method // 方法简写
};
obj2.method(); // 输出 method
```
:::