## JavaScript进阶
::: tip 主要考察点
原型继承、this 关键字的绑定、事件循环与任务队列、Promise 和 async/await、函数式编程、模块化机制、内存管理以及性能调优技巧。
:::

### JavaScript 中 Object.keys 的返回值是无序的吗 ?
在 JavaScript 中，`Object.keys` 方法返回一个数组，该数组的元素是一个对象自身可枚举属性的字符串键。<br>
尽管对象的属性在 ECMAScript 标准中没有明确的顺序要求，但现代 JavaScript 引擎对对象的属性顺序做出了一定保证，因此我们通常可以认为 `Object.keys` 返回值是有序的。<br>

更具体地，`Object.keys` 返回的数组顺序遵循以下规则：
- 所有键为整数类型的属性按从小到大排序。
- 所有字符串类型键按创建的顺序排序。
- 所有 symbol 类型的键按创建的顺序排序。
#### 补充
- 整数类型键顺序：
在 JavaScript 中，属性名可以是字符串或符号，但在` Object.keys` 中，如果属性名看起来像一个整数（例如 "1", "2", "42"），这些属性会按数值顺序排列并出现在数组的前部分。
- 字符串类型键顺序：
非整数类型的字符串键会严格按照它们被创建的顺序排列。
这条规则意味着，如果你在对象上定义了一堆字符串属性，这些属性会按照你定义它们的顺序在 `Object.keys` 输出的数组中出现。
- 符号类型键：
要了解完整的属性顺序，我们需要提到符号键。
尽管 `Object.keys` 不会返回符号键，但符号键在对象内部的顺序按它们被创建的顺序排列。
在 `Object.getOwnPropertyNames` 或反射式的方法 (`Reflect.ownKeys`) 中，你可以看到它们排列的顺序。
- 实际应用和注意事项：
虽然以上顺序已经在现代 JavaScript 引擎中得到很好的支持，例如 V8 引擎（用于 Chrome 和 Node.js）和 SpiderMonkey 引擎（用于 Firefox），但在一些较老的或非标准的引擎中，不一定会遵从这些规则。
所以，如果你在面对较老版本的 JavaScript 引擎时，还是要谨慎些，最好不要依赖对象属性的顺序。
- ES6 中 Map 的使用：
如果你确实需要一个可以保证键值顺序的数据结构，可以考虑使用 ES6 引入的 Map 对象。Map 保证了按照插入顺序的迭代顺序，这是一个显著的优点。
在某些场景下，利用 Map 而不是普通的对象能让代码更加可靠和可预测。

### 说说你对 fetch 的理解，它有哪些优点和不足 ?
#### 含义
Fetch 是现代 JavaScript 中用于进行网络请求的 API。
它是基于 Promise 的，在替代传统的 XMLHttpRequest (XHR) 做网络请求时提供了一种更简单、更直观的编码方式。
#### 优点
- 简洁和直观：
  - 语法更加简洁，没有回调地狱，更类似于现代 JavaScript 的编程风格。
- 基于 Promise：
  - 使得处理异步操作更加优雅，可以使用 `then` 和 `catch` 处理成功和失败的情况，也可以结合 `async/await` 使代码更易读。
- 更好的错误处理：
  - 不会仅仅在网络错误时触发 `reject` 状态，4xx 和 5xx 的 HTTP 响应状态不会自动被视为错误，需开发者自行处理。
- 更丰富的功能：
  - 支持请求/响应拦截、请求取消以及更多控制的能力，例如可以通过设置 mode 字段来控制跨域请求。
#### 不足及应对策略
- 不可中断：
  - 标准 Fetch 请求一旦发起，无法中途取消，尽管后来引入了 `AbortController` 来提供解决方案，但它依旧不如其他一些请求库来的方便。
  - 可以使用 `AbortController` 和 `signal` 实现请求取消操作
- 错误处理复杂：
  - 需要自己手动处理 HTTP 错误情况，比如 404 或 500，不像其他库那样自动处理。
  - 其他库: axios
- 不支持所有浏览器：
  - 部分老旧的浏览器不支持 Fetch 比如 IE，这样的场景下需要使用 `polyfill` 或者退回到 XHR。
  - 使用 `polyfill`，例如 whatwg-fetch 来为它们添加支持
- 不支持进度监控：
  - 无法监控请求上传或下载的进度，而 XMLHttpRequest 是支持的。
  - 结合 ReadableStream 来实现一些简单的方案
#### 补充
```js
const controller = new AbortController();
const signal = controller.signal;

fetch('/some-api', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', err);
    }
});

// 中途取消请求
controller.abort();
```

### JavaScript 的 BigInt 和 Number 类型有什么区别 ?
- 数值范围：
  - `Number`: 大约从 -2^53 到 2^53 之间。
  - `BigInt`: 可以表示非常大的整数(远超 `Number` 的范围)。
- 数据类型：
  - `Number`: 任意大小的浮点数。
  - `BigInt`: 仅表示大整数，不支持浮点数。
- 操作方式：
  - `Number`: 类型可以进行 +, -, *, / 等操作，不过在超大数值运算时精度可能会有损失。
  - `BigInt`: 类型主要用于整数操作，这样的运算不会出现精度损失，但是需要使用 `BigInt` 特有的运算符和方法。
- 表示方式：
  - `Number`: 常规表示法，如 42 或 3.14。
  - `BigInt`: 整数后添加 n，如 9007199254740991n。也可以使用 `BigInt()`。
- 性能考量: 
  - 操作 BigInt 一般比操作小范围的 Number 更慢，因为它需要处理更多位数的计算。
- 类型转换:
  - `Number` => BigInt: BigInt(number) 小数部分会被截取掉
  - `BigInt` => Number: Number(bigInt) 可能引起溢出和精度丢失
- API 支持:
  - `Number` 是 JavaScript 中默认的数值类型，有广泛的内置运算支持
  - `BigInt` 引入于 ECMAScript 2020（ES11），需要较新的浏览器版本支持

### 什么是 JavaScript 的尾调用? 使用尾调用有什么好处 ?
#### 含义
尾调用是指函数内部的最后一个操作是调用另一个函数的情况。<br>
在 JavaScript 中，当一个函数调用发生在另一个函数的尾部（即调用结束后直接返回其结果，而无需进一步操作）时，这种调用称为尾调用。
#### 好处
使用尾调用的主要好处在于其对栈内存的优化。<br>
通常情况下，每一个函数调用都会在栈内存中占据一个新的框架（frame），直到函数执行完成。<br>
尾调用不需要保留当前函数的执行上下文，直接复用当前的栈帧，使递归操作更加高效，避免栈溢出（stack overflow）的风险，从而节省内存开销。
#### 补充
- 尾调用优化（Tail Call Optimization，TCO）：
并非所有的 JavaScript 环境都支持尾调用优化。<br>
例如，某些现代浏览器和 Node.js 在严格模式下才会执行优化。
- 尾递归（Tail Recursion）:
尾递归是尾调用的一种特殊形式，指的是在递归函数中，递归调用是函数的最后一个操作。<br>
因为尾递归可以直接复用当前的栈帧，所以在处理深度递归时，尾递归能显著减少栈内存的使用量。
```js
// 非尾递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// 尾递归
function factorialTail(n, acc = 1) {
  if (n === 1) return acc;
  return factorialTail(n - 1, n * acc);
}
```
- JavaScript 严格模式：
在 JavaScript 中，为了使尾调用优化生效，代码需要运行在严格模式（strict mode）下。<br>
最简单的方法是在文件或函数的头部添加 "use strict" 指令
- 应用场景：
尾调用和尾递归特别适合解决那些包含大量迭代步骤的算法问题。<br>
常见的场景包括计算阶乘、斐波那契数列、Hanoi 塔问题等。<br>
通过将递归过程转化为尾递归，可以显著提高程序在处理大数据量时的性能表现。

### 什么是 JavaScript 的闭包 ? 有什么作用和使用场景 ?
#### 含义
- 闭包是指在 JavaScript 中，函数能够访问其词法作用域（定义时而不是执行时的作用域）中的变量。
- 即使该函数是在其定义的作用域之外执行的。
- 简单来说，闭包让你能够从外部访问一个函数内部的变量。
#### 实现原理
- 闭包是一个函数能够访问其外部声明的变量，即使在该函数在它的词法作用域之外被调用。
- 具体来说，闭包是由函数和其外部环境的组合。
  - 当一个函数在另一个函数内部被定义时，内部函数可以访问外部函数的变量，这种现象被称为闭包。
#### 主要作用
- 创建私有变量和方法：
  - 闭包可以帮助我们模拟私有变量，从而增加代码的可维护性和安全性。
- 保存状态：
  - 可以用来保持某个函数执行上下文中的状态。
- 回调函数：
  - 在异步编程中，闭包用于传递回调函数并保留执行时的环境。
#### 使用场景
- 数据封装：
  - 比如模块模式，隐藏内部实现，只暴露需要的接口。
- 记忆化函数：
  - 缓存函数的运算结果，从而提高性能。
- 事件处理器：
  - 闭包有助于避免全局变量污染，并且能够保持事件处理过程中需要的状态。
#### 代码示例
```js
// 1、模拟私有变量和方法
// 闭包通常用来创建私有变量和方法。
// 在 JavaScript 中，我们没有真正的私有成员，但我们可以通过闭包来模拟这一点。
function Counter() {
  let count = 0;
  return {
    increment: function() {
      count ++;
      return count;
    },
    decrement: function() {
      count --;
      return count;
    }
  };
}
const myCounter = Counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.decrement()); // 0
// 在这个例子中，count 变量对外部是完全隐藏的，只有通过 increment 和 decrement 方法才能访问和修改它。

// 2、保存状态（创建函数工厂）
// 闭包允许我们在函数执行的后续调用中保存状态。
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = makeAdder(5);  // x => 5  add5 => (y) { return x + y }
console.log(add5(2));  // 7
console.log(add5(10)); // 15

// 3、回调函数和异步编程
// 在许多异步编程中
// 比如事件监听或计时器函数，闭包可以帮助我们在回调函数中保持执行时的环境。
function setup() {
  let name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}
const myFunc = setup();
myFunc(); // Alerts 'Mozilla'
// displayName 函数在定义它的作用域内引用了 name 变量
// 而当 setup 函数返回之后，displayName 仍然能够访问 name。
function fetchData(url) {
  let cachedData;
  return function(callback) {
    if (cachedData) {
      callback(cachedData);
    } else {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          cachedData = data;
          callback(data);
        });
    }
  };
}
const getData = fetchData('https://api.example.com/data');
getData(data => {
  console.log(data); // 输出获取到的数据
});
// 只在第一次调用时进行网络请求，而后续调用直接返回缓存中的数据。

// 4、数据封装与模块模式
// 闭包在现代 JavaScript 模块开发中也很有用。
// 通过闭包，我们可以创建模块，隐藏内部实现，只暴露必要的接口。
const Module = (function() {
  let privateVariable = "I am private";
  function privateMethod() {
    console.log(privateVariable);
  }
  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();
Module.publicMethod(); // Logs 'I am private'
// 这里利用闭包创建了一个模块 Module，其中的 privateVariable 和 privateMethod 是私有的，仅能通过 publicMethod 访问。
```

### JavaScript 中如何解决回调地狱问题 ?
- 在 JavaScript 中，要解决回调地狱（Callback Hell）问题，最常用的方式有三种：
  - 1、使用 Promise。
  - 2、使用 async/await。
  - 3、模块化回调函数。
- 它们都是为了解决嵌套过深的回调函数导致的代码难以阅读和维护的问题。
#### 代码示例
::: code-group
```js [Promise.js]
// Promise 提供了一种链式调用的方法，可以让代码看起来更加清晰。
// 通过 then() 方法，你可以在回调完成后立即处理返回值，而不用不断地嵌套回调函数。
function doSomething() {
  return new Promise((resolve, reject) => {
    // 一些异步操作
    if (/* 成功条件 */) {
    resolve('成功');
  } else {
    reject('失败');
  }
  });
}
doSomething()
  .then(result => {
    console.log(result);
    return doSomethingElse();
  })
  .then(anotherResult => {
    console.log(anotherResult);
  })
  .catch(error => {
    console.error(error);
  });
```
```js [async-await.js]
// async/await 是基于 Promise 的语法糖，通过这种方式可以让异步代码看起来更加同步，进一步提升了代码的可读性。
// 它简化了异常处理，使得错误处理更加直观。
async function asyncFunc() {
  try {
    const result = await doSomething();
    console.log(result);
    const anotherResult = await doSomethingElse();
    console.log(anotherResult);
  } catch (error) {
    console.error(error);
  }
}
asyncFunc();
```
```js [module-callback.js]
// 通过将回调函数模块化，把每一个回调函数作为一个独立的模块，这样可以减少嵌套的层次，使代码更易于维护。
function firstTask(callback) {
  // 一些异步操作
  callback(null, '结果一');
}
function secondTask(input, callback) {
  // 一些异步操作
  callback(null, '结果二');
}
firstTask((err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  secondTask(result, (err, anotherResult) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(anotherResult);
  });
});
```
:::
#### 补充
除了上述最常用的三种方法，还有其他方式可以进一步提升代码质量和可读性
- 事件驱动编程: 
  - 通过引入事件驱动的模型，比如使用 Node.js 的 EventEmitter 类，可以在达到某个条件时触发特定的事件，从而避免嵌套的回调函数。
- RxJS:
  - 这是一个用于处理复杂异步逻辑的库，通过 Observable 的方式提供了一种更强大的处理异步操作的方法。
  - 它允许你使用流式方法操作异步数据流。
- 生成器函数：
  - 生成器函数（Generator Functions）结合 co 这样的库，可以将异步执行流控制得更好，但它通常不如 async/await 简洁直接。
  ::: details 代码示例
  ```js
  const co = require('co');
  function* generatorFunc() {
    try {
      const result = yield doSomething();
      console.log(result);
      const anotherResult = yield doSomethingElse();
      console.log(anotherResult);
    } catch (err) {
      console.error(err);
    }
  }
  co(generatorFunc);
  ```
  :::

### JavaScript 数组 sort 函数的实现原理是什么 ?
JavaScript 数组的 `sort` 函数是基于`快速排序`（QuickSort）和`插入排序`（InsertionSort）混合实现的。<br>
它会根据数组的长度和数据的具体情况动态选择不同的排序算法，以达到最佳性能。<br>
具体来说，对于较小的数组，`sort` 函数会使用插入排序，而对于较大的数组，则会使用快速排序。
#### 补充
##### 快速排序（QuickSort）
快速排序是一种高效的排序算法，通常将选定的“基准值”与其他元素进行比较，然后将数组分成“低于基准值”的一部分和“高于基准值”的一部分，之后递归地对这两部分分别进行排序。<br>
快速排序的平均时间复杂度为 O(n log n)。
##### 插入排序（InsertionSort）
插入排序是一种简单直观的排序算法，适用于较小的数组。<br>
它通过从头到尾扫描数组，将每个元素插入到已排序部分的正确位置。<br>
插入排序的平均时间复杂度为 O(n²)，但对于几乎已排序的数组，它的性能非常出色。
##### 稳定性
JavaScript 的 `sort` 方法默认情况下并不是稳定的。<br>
所谓稳定的排序算法，是指如果待排序的序列中存在两个或两个以上相等的元素，排序后这些元素的相对顺序与排序前保持一致。
##### 自定义比较函数
`sort` 函数可以接收一个可选的自定义比较函数。
```js
array.sort(function(a, b) {
  return a - b; // 升序排序
});
```
如果没有提供比较函数，`sort` 函数会按照字符编码的序列顺序对数组的元素进行排序。<br>
这意味着字符串形式的 '10' 会被认为比 '2' 小，因为在 Unicode 排序中 '1' 比 '2' 小。
##### 性能优化
为了提高性能，现代浏览器会对 `sort` 函数进行优化。<br>
例如，当数组非常小时（如长度小于 10），V8 引擎可能会使用插入排序而不是快速排序。<br>
- 其他优化技巧
  - 在写自定义比较函数时，尽量简化比较逻辑。
  - 尽量避免对大数组进行频繁排序，考虑合并排序等策略。