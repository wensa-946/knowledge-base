## JavaScript基础
::: tip 主要考察点
数据类型、作用域、闭包、原型链、事件处理、DOM 操作、定时器、异步编程（如回调函数）以及常见的内置对象和方法。
:::

### JavaScript 中 || 和 && 操作符的返回值是什么 ?
- 逻辑或
  - 1、对第一个操作数进行条件判断。
  - 2、如果第一个操作数是 true, 则返回第一个操作数的值。
  - 3、如果第一个操作数是 false, 则返回第二个操作数的值。
- 逻辑与
  - 1、对第一个操作数进行条件判断。
  - 2、如果第一个操作数的条件判断结果为 false, 则返回第一个操作数的值。
  - 3、如果第一个操作数的条件判断结果为 true, 则返回第二个操作数的值。

### Object.is() 与比较操作符 == 和 === 的区别是什么 ?
- 双等号 (==)
  - 如果类型不同, 会进行类型转换。
  - 将 null 和 undefined 视为相等。
  - 将布尔值转换为数字再进行比较。
  - 将字符串和数字进行比较时，会将字符串转为数字。
  - 对象与原始类型进行比较时，对象会先调用 valueOf()方法转为原始类型，再进行比较。
```js
console.log(2 == '2') // true
console.log(null == undefined) // true
console.log(true == 1) // true
console.log(false == 0) // true
console.log('' == 0) // true
console.log([1,2] == '1,2') // true
```
- 三等号 (===)
  - 如果类型不同, 返回 false
  - 如果类型相同, 再进行值得比较
```js
console.log(2 === '2') // false
console.log(null === undefined) // false
console.log(true === 1) // false
console.log(false === 0) // false
console.log('' === 0) // false
console.log([1,2] === '1,2') // false
```
- Object.is()
  - 如果类型不同, 返回 false
  - 如果类型相同, 再进行值得比较
  - 特殊情况：-0 和 +0 返回 false, NaN 和 NaN 返回 true
#### 区别
- 双等号进行类型转换再比较，适用于宽松相等性判断
- 三等号不进行类型转换，适用于严格相等性判断
- 严格相等运算符 `Object.is()` 更严格, 适用于精确相等性判断
- `Object.is()` 与 === 类似, 但是 NaN 和 -0 特殊
- `Object.is()` === 行为更加可预测
- 由于 === 不需要进行类型转换，所以通常会比 == 的执行速度更快

### 请详细说说 0、+0、-0 这三个有什么区别 ?
- 比较：
  - 在大多数情况下, 0、+0 和 -0 在比较时都被视为相等。
  - 三等号: 0 === +0 和 0 === -0 都会返回 true。
  - Object.is() 可以区分它们。Object.is(0, -0) => false, Object.is(+0, 0) => true。
- 除法：
  - 1 / +0 返回 Infinity, 而 1 / -0 返回 -Infinity。
  - 对于 0, 它通常被视为 +0, 所以 1 / 0 也会返回 Infinity。
- 字符串表示：
  - 当转换为字符串时, 0 和 +0 => "0" -0 => "-0"
- 数学函数：
  - Math.sign() Math.sign(+0) => 0 Math.sign(-0) => -0。

#### JavaScript 脚本延迟加载的方式有哪些 ?
- 使用`async`属性
  - `async` 属性用于让脚本尽可能地异步加载, 不会阻塞HTML解析, 脚本一旦下载完成就立即执行 (不会等待HTML解析完成)
  - 如果有多个`async`脚本, 它们的执行顺序是不确定的
  - 通常用于独立性较高地脚本: 第三方的统计代码、广告代码等
```js
<script async src="example.js"></script>
```
- 使用`defer`属性
  - `defer`属性同样用于脚本延迟加载, 但是它保证了所有`defer`脚本会按照在文档中出现的顺序依次执行,并且是在整个HTML解析完成后执行
  - 因此适合依赖于HTML结构的脚本, 比如需要操作DOM的脚本
```js
<script defer src="example.js"></script>
```
- 动态创建脚本元素
  - 通过JavaScript动态创建`script`标签并插入到文档中
  - 这种方式可以较为灵活地控制脚本的加载和执行时机
  - 常需要某些条件触发时才加载的场景中使用
  - 可以实现按需加载、延迟加载等优化策略
```js
var script = document.createElement('script');
script.src = 'example.js';
script.async = true; // 或者 script.defer = true;
document.head.appendChild(script);
```
- 使用模块化加载工具
  - RequireJS、Webpack、ESM (ECMAScript Modules)、Service Workers (离线加载、缓存) 等
  - 这些工具提供了更为强大的依赖管理和延迟加载功能
  - 适用于大型项目中, 解析代码拆分和按需加载的问题
```js
// Webpack 示例
import('example.js').then(({ default: example }) => {
  // 使用加载的模块
});
```

### 什么是 DOM 和 BOM ?
#### DOM (Document Object Model) 文档对象模型, 是针对 HTML 和 XML 文档的 API (应用程序编程接口)。DOM 描绘了一个层次化的节点树,允许开发人员添加、移除和修改页面的某一部分。
简单来说, 它就是把网页内容转换成 JavaScript 可以操作的对象。
- DOM 的主要特点
  - 它将文档解析为一个由节点和对象组成的结构集合
  - 它定义了文档的结构, 以及如何访问和操作文档
- DOM 的作用
  - 允许程序和脚本动态地访问和更新文档的内容、结构和样式
  - 提供了一种标准化的方式来操作网页内容
- 常见的DOM操作
  - 获取元素: `document.getElementById()、getElementsByClassName()、querySelector()`
  - 创建元素: `document.createElement()、appendChild()、insertBefore()`
  - 修改元素属性: `element.setAttribute()、removeAttribute()`, 也可以`element.className = "class-name"`
  - 修改元素内容: `element.innerHTML` 可以解析 HTML 标签、`element.textContent` 只会识别并处理纯文本
  - 修改元素样式: `element.style.property`
  - 添加或删除元素: `parentNode.appendChild()、removeChild()、insertBefore()、replaceChild()`
  - 事件监听: `element.addEventListener()`
  - 一些进阶操作：
    - 克隆节点：使用 `element.cloneNode()` 方法可以复制节点。
    - 查找父节点/子节点：通过 `element.parentNode, element.childNodes, element.firstChild, element.lastChild` 等可以遍历不同层次的节点。
    - 获取或设置样式：可以通过 `element.style` 对象来操作内联样式，或者通过 `window.getComputedStyle()` 获取元素的计算样式。
    - 处理样式类名：使用 `classList` 属性可以方便地添加、删除、切换和判断类名，例如 `element.classList.add('new-class')`。
#### BOM (Browser Object Model) 浏览器对象模型, 是针对浏览器的 API。BOM 提供了独立于内容而与浏览器窗口进行交互的对象。由于 BOM 主要涉及控制浏览器、与用户交互等操作, 因此它也被称为浏览器对象模型。
简单来说, 它就是浏览器提供的用于操作浏览器的接口。
- BOM 的主要组成部分
  - `window` 对象: JavaScript 层级中的顶层对象, 表示浏览器窗口
  - `navigator` 对象: 包含有关浏览器的信息
  - `location` 对象: 包含有关当前 URL 的信息
  - `screen` 对象: 包含有关客户端显示屏幕的信息
  - `history` 对象: 包含浏览器的历史记录
- BOM 的作用
  - 提供了与浏览器交互的方法和接口
  - 允许 JavaScript 与浏览器对话
- 常见的 BOM 操作
  - 打开新窗口: `window.open()`
  - 移动、调整窗口大小:` window.moveTo()、 window.resizeTo()`
  - 导航到其他URL: `winodw.location.href = ""`
  - 获取浏览器信息: `navigator.userAgent`
  - 操作浏览历史: `history.back() hisotry.forward()`
#### DOM 和 BOM 的主要区别
- DOM 主要处理网页内容, 而 BOM 主要处理浏览器窗口和功能
- DOM 是 W3C (World Wide Web Consortium) 组织推荐的标准, 而 BOM 没有相关标准
- DOM 可以在任何支持 XML 的环境中使用, 而 BOM 只能在浏览器环境中使用

### use strict 是什么意思 ? 使用它有什么区别 ?
#### 含义
"use strict" 是一个字符串声明，放在脚本或函数的开头，用来指定代码应该在严格模式下执行。
```js
"use strict";
// 后面的代码会在严格模式下执行
```
#### 严格模式的主要作用
严格模式主要是为了捕获一些常见的编程错误，并防止使用一些可能在未来版本中定义的语法。
#### 使用 "use strict" 的主要区别
```js
"use strict";
// 1、变量必须声明后再使用
x = 3.14; // 错误：x 未定义

// 2、禁止使用 with 语句
with (Math){x = cos(2)}; // 语法错误

// 3、创建 eval 作用域
// 在严格模式下，eval() 中的代码会在自己的作用域中执行，而不是在当前作用域中。

// 4、禁止 this 关键字指向全局对象
function f(){
  return this;
}
f(); // 返回 undefined，而不是全局对象

// 5、函数参数不能有重名
function sum(a, a, c){ // 语法错误
    return a + a + c;
}

// 6、禁止八进制数字语法
var sum = 015 + 197 + 142; // 语法错误

// 7、禁止对只读属性赋值
var obj = {};
Object.defineProperty(obj, "x", { value: 0, writable: false });
obj.x = 3.14; // 抛出错误

// 8、禁止删除不可删除的属性
delete Object.prototype; // 抛出错误
```
#### 使用 "use strict" 的好处
- 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为。
- 消除代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度。
- 为未来新版本的 JavaScript 做好铺垫。
#### 拓展
在类和模块中，严格模式会自动启用。使用 "use strict" 可以帮助我们写出更加规范、安全的代码，并且可以在开发阶段就发现一些潜在的问题。<br>
在现代 JavaScript 开发中，特别是使用 ES6 模块或类时，严格模式已经成为默认行为。

### JavaScript 中 substring 和 substr 函数的区别是什么 ?
#### 参数含义 -最主要的区别
```js
// - substring(startIndex, endIndex) 方法
//   - startIndex：开始提取字符的位置
//   - endIndex：结束提取字符的位置（不包括该位置的字符）
// - substr(startIndex, length) 方法
//   - startIndex：开始提取字符的位置
//   - length：要提取的字符数
let str = "Hello, World!";
console.log(str.substring(-3)); // 输出: "Hello, World!"
console.log(str.substr(-3));    // 输出: "ld!"
```
#### 负值参数的处理和参数顺序
```js
// - 负值参数的处理
//   - substring 方法会将负值参数都转换为 0
//   - substr 方法允许第一个参数为负值，它会从字符串的末尾开始计数
// - 参数顺序
//   - substring 方法会自动调整参数的顺序，使得 startIndex 总是小于等于 endIndex
//   - 而 substr 不会这样做
let str = "Hello, World!";
console.log(str.substring(5, 2)); // 输出: "llo"
console.log(str.substr(5, 2));    // 输出: ", "
```
#### 浏览器兼容性和未来发展
- `substring` 方法在所有现代浏览器中都得到了很好的支持。
- 而 `substr` 方法虽然目前仍被广泛支持，但已经被 MDN 标记为废弃（deprecated）。
- 这意味着在未来的 JavaScript 版本中，`substr` 可能会被移除。
#### 拓展
> [!TIP] 可以更现代的 `slice` 方法来平替 `substring` 方法

### JavaScript 数组的 map 和 forEach 函数中能否通过 break 等语法结束循环 ?
在 JavaScript 中，`map` 和 `forEach` 方法中是不能直接使用 break 或 continue 语句来结束循环的。<br>
这是因为 `map` 和 `forEach` 是高阶函数,它们的设计初衷就是要遍历整个数组。
```js
// 1、forEach 中抛出一个自定义异常，然后在异常捕获块中终止循环
try {
  [1, 2, 3, 4, 5].forEach(item => {
    if (item > 3) throw new Error("Break");
    console.log(item);
  });
} catch (e) {
  if (e.message !== "Break") throw e;
}
// 这种方法虽然可以达到目的,但我个人不太推荐,因为使用异常来控制程序流程不是一个好习惯

// 2、使用 Array.prototype.some() 或 Array.prototype.every()
[1, 2, 3, 4, 5].some(item => {
  if (item > 3) return true;
  console.log(item);
  return false;
});
// every 方法也可以，这两个方法允许你在满足某个条件时提前结束循环，这种方法更加优雅,也更符合函数式编程的思想

// 3、使用普通的 for 循环
for (let item of [1, 2, 3, 4, 5]) {
  if (item > 3) break;
  console.log(item);
}
// 这种方法虽然不够简洁,但是在需要更细粒度控制循环的情况下很有用

// 4、Array.prototype.reduce()
[1, 2, 3, 4, 5].reduce((acc, item) => {
  if (acc.break) return acc;
  if (item > 3) return { break: true };
  console.log(item);
  return acc;
}, {});
// 这种方法比较灵活,可以根据需要存储和传递更多的信息
```

### JavaScript 的 splice 和 slice 函数会改变原数组吗 ?
```js
// 1、splice() 方法 会改变原数组
// 可以在数组中添加、删除或替换元素，并返回被删除的元素
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(2, 2); // 从索引2开始删除2个元素
console.log(arr); // 输出: [1, 2, 5]
console.log(removed); // 输出: [3, 4]
const arr1 = [1, 2, 3, 4, 5];
arr1.splice(2, 2, 'a', 'b');
console.log(arr1); // 输出: [1, 2, 'a', 'b', 5]
const arr2 = [1, 2, 3, 4, 5];
arr2.splice(2, 0, 'a', 'b'); // 插入元素
console.log(arr2); // 输出: [1, 2, 'a', 'b', 3, 4, 5]

// 2、slice() 方法 不会改变原数组
// 从原数组中返回指定开始和结束位置的元素组成的新数组，包含原数组的一部分浅拷贝。
const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 3); // 从索引1开始到索引3结束（不包括索引3）
console.log(arr); // 输出: [1, 2, 3, 4, 5]
console.log(sliced); // 输出: [2, 3]
```

### JavaScript 中怎么删除数组最后一个元素 ?
```js
// 1、使用 pop() 方法
// 删除数组的最后一个元素，返回被删除的元素。
// 性能非常高效
let fruits = ['apple', 'banana', 'orange'];
let lastFruit = fruits.pop();
console.log(lastFruit); // 输出: 'orange'
console.log(fruits); // 输出: ['apple', 'banana']
// pop() 方法的优点是简单直观，而且它会直接修改原数组
// pop() 方法处理空数组时要小心，因为它返回 undefined

// 2、使用 splice() 方法
// 更加灵活
// 第一个参数 -1 表示从数组末尾开始，第二个参数 1 表示删除一个元素
let removedFruits = fruits.splice(-1, 1);
console.log(removedFruits); // 输出: ['orange']
console.log(fruits); // 输出: ['apple', 'banana']

// 3、使用 slice() 方法
// 如果不想修改原数组，可以使用 slice() 方法创建一个新数组
// 会有额外的内存开销
let newFruits = fruits.slice(0, -1);
console.log(newFruits); // 输出: ['apple', 'banana']
console.log(fruits); // 输出: ['apple', 'banana', 'orange']

// 4、使用数组长度
// 简单高效、阅读性稍微差
fruits.length = fruits.length - 1;
console.log(fruits); // 输出: ['apple', 'banana']
```

### 如何判断网页元素是否到达可视区域 ?
通常用于实现懒加载、无限滚动或者触发动画等场景中
```js
// 1、使用 Intersection Observer API
// 既高效又简单、可以异步地观察目标元素与其祖先元素或视口的交叉状态
// 性能好，不会阻塞主线程，而且使用起来相对简单
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('元素进入可视区域');
      // 在这里执行你的逻辑
    }
  });
});
const target = document.querySelector('#your-element');
observer.observe(target);

// 2、getBoundingClientRect() 方法
// 更精确的控制、兼容旧版浏览器
// 这个方法返回元素的大小及其相对于视口的位置
// 如果在滚动事件中频繁调用，可能会影响性能
// 可以使用节流（throttle）或防抖（debounce）技术来限制函数的调用频率，以避免过度消耗性能。
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
// 使用
const element = document.querySelector('#your-element');
if (isElementInViewport(element)) {
  console.log('元素在可视区域内');
}

// 3、使用 Element.checkVisibility() 方法
// 相对较新的 API，可以直接检查元素是否可见
// 需要注意浏览器兼容性问题
const element = document.querySelector('#your-element');
if (element.checkVisibility()) {
  console.log('元素可见');
}
// 这个方法还可以接受一个选项对象，用于进行更细粒度的检查
element.checkVisibility({
  checkOpacity: true,  // 检查 opacity 是否为 0
  checkVisibilityCSS: true  // 检查 visibility CSS 属性
});
```

### JavaScript 操作数组元素的方法有哪些 ?
#### 添加
```js
// push(): 在数组末尾添加一个或多个元素。
// unshift(): 在数组开头添加一个或多个元素。
// splice(): 在指定位置添加元素。
const arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4]
arr.unshift(0); // [0, 1, 2, 3, 4]
arr.splice(2, 0, 1.5); // [0, 1, 1.5, 2, 3, 4]
```
#### 修改
```js
// fill(): 用一个固定值填充数组中从起始索引到终止索引的全部元素。
// copyWithin(): 将数组中的一部分复制到同一数组中的另一个位置，并返回它，而不改变数组的长度。
let arr = [1, 2, 3, 4, 5];
console.log(JSON.parse(JSON.stringify(arr)).fill(0, 2, 4)); // 输出: [1, 2, 0, 0, 5]
arr.copyWithin(0, 3, 5);
console.log(arr); // 输出: [4, 5, 3, 4, 5]
```
#### 删除
```js
// pop(): 删除数组最后一个元素。
// shift(): 删除数组第一个元素。
// splice(): 删除指定位置的元素。
const arr = [1, 2, 3, 4];
arr.pop(); // [1, 2, 3]
arr.shift(); // [2, 3]
arr.splice(1, 1); // [2] 删除索引1处的一个元素
```
#### 查找
```js
// indexOf(): 返回指定元素在数组中的第一个索引，如果不存在则返回 -1。
// lastIndexOf(): 返回指定元素在数组中的最后一个索引，如果不存在则返回 -1。
// includes(): 判断数组是否包含指定的元素，返回布尔值。
// find(): 返回符合条件的第一个元素。
// findIndex(): 返回符合条件的第一个元素的索引。
const arr = [1, 2, 3, 4];
arr.indexOf(3); // 2
arr.lastIndexOf(3); // 2
arr.includes(3); // true
arr.find(num => num > 2); // 3
arr.findIndex(num => num > 2); // 2
```
#### 遍历
```js
// forEach(): 对数组中的每个元素执行一次提供的函数。
// map(): 创建一个新数组，其结果是对原数组中的每个元素执行一次提供的函数后的返回值。写 React 最常用的数组方法
const arr = [1, 2, 3];
arr.forEach(num => console.log(num)); // 1 2 3
const newArr = arr.map(num => num * 2); // [2, 4, 6]
```
#### 筛选
```js
// filter(): 创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
// every(): 测试数组的所有元素是否都通过了指定函数的测试。如果是，返回 true，否则返回 false。
// some(): 测试数组中的某些元素是否至少有一个通过了指定函数的测试。如果是，返回 true，否则返回 false。
const arr = [1, 2, 3, 4];
const evenNumbers = arr.filter(num => num % 2 === 0); // [2, 4]
let arr1 = [1, 2, 3, 2, 5];
console.log(arr.every(element => element < 10)); // 输出: true
console.log(arr.some(element => element % 2 === 0)); // 输出: true
```
#### 变换数组
```js
// reduce(): 对数组中的每个元素执行一个 reducer 函数，将其结果汇总为单个值。
// sort(): 对数组元素进行排序。
// reverse(): 反转数组中元素的顺序。
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, num) => acc + num, 0); // 10
arr.sort((a, b) => b - a); // [4, 3, 2, 1]
arr.reverse(); // [1, 2, 3, 4]
```
#### 复制和合并
```js
// slice(): 返回一个新数组，是原数组的浅拷贝。
// concat(): 合并两个或多个数组，返回一个新数组。
// spread operator (...): 扩展运算符，用于复制数组或合并数组。
const arr = [1, 2, 3];
const copy = arr.slice(); // [1, 2, 3]
const merged = arr.concat([4, 5]); // [1, 2, 3, 4, 5]
const spreadMerged = [...arr, 4, 5]; // [1, 2, 3, 4, 5]
```
#### 转换数组
```js
// toString(): 将数组转换为一个字符串，其中每个数组元素用逗号分隔。
// join(): 将数组的所有元素连接成一个字符串，并可指定一个分隔符。
// toLocaleString(): 将数组的所有元素转换为本地字符串表示。
// Array.from(): 从类数组对象或可迭代对象创建一个新的数组实例。
// valueOf(): 返回的是数组本身
let arr = [1, 2, 3, 4, 5];
console.log(arr.toString()); // 输出: "1,2,3,4,5"
console.log(arr.join('-')); // 输出: "1-2-3-4-5"
let arr1 = [1, 'a', new Date()];
console.log(arr1.toLocaleString()); // 输出: "1,a,6/25/2024, 12:00:00 AM"（日期格式会根据本地设置有所不同）
let str = 'hello';
let arr = Array.from(str);
console.log(arr); // 输出: ["h", "e", "l", "l", "o"]
let colors = ["red", "blue", "green"];  
console.log(colors.valueOf())  // ["red", "blue", "green"]
```
#### 补充
```js
// 1、数组方法可以链式调用, 实现数组多操作
const arr = [1, 2, 3, 4, 5];
const result = arr.filter(num => num % 2 === 0).map(num => num * 2); // [4, 8]

// 2、数组快速去重实现：
[...new Set([1,2,3,2])]
```

### JavaScript 中 for...in 和 for...of 的区别是什么 ?
- 用法
  - `for...in`: 用于遍历对象的可枚举属性，包括其原型链上的可枚举属性
  - `for...of`: 用于遍历可迭代对象（如数组、字符串、Map、Set等）
- 返回值
  - `for...in`: 返回的是属性名（键名）
  - `for...of`: 返回的是每次迭代的值
- 遍历普通对象
  - `for...in`: 可以遍历普通对象，也可以遍历数组（但不推荐）
  - `for...of`: 不能直接用于遍历普通对象。
- 版本
  - `for...in`: ES3 语法
  - `for...of`: ES6 语法
- 遍历顺序
  - `for...in`: 不保证遍历顺序
  - `for...of`: 会按照迭代器定义的顺序进行遍历
- 性能
  - `for...of` 的性能比 `for...in` 更好，特别是在遍历数组时
- 继承属性
  - `for...in` 会遍历对象的原型链，而 `for...of` 不会
- 使用场景
  - `for...in`: 更适合用于遍历对象的属性
  - `for...of`: 更适合用于遍历数组或其他可迭代对象的值
```js
// for...in 示例
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // 输出: "a", "b", "c"
}

// for...of 示例
const arr = [1, 2, 3];
for (const value of arr) {
  console.log(value); // 输出: 1, 2, 3
}

// 补充
// for...in 可以用于遍历数组，但它可能会遍历到数组的非数字属性，导致意外的结果，例如：
const arr = [1, 2, 3];
arr.foo = 'bar';

for (const index in arr) {
  console.log(index); // 输出: "0", "1", "2", "foo"
}

// 如果需要同时获取数组的索引和值，可以结合使用 for...of 和 Array.entries()
const arr = ['a', 'b', 'c'];
for (const [index, value] of arr.entries()) {
  console.log(index, value); // 输出: 0 "a", 1 "b", 2 "c"
}
// 遍历对象也可以通过 Object.entries() + for ... of 实现
```

### JavaScript 如何使用 for...of 遍历对象 ?
`for...of` 语句不能直接用于遍历对象的。<br>
首先，`for...of` 循环是用来遍历可迭代对象（ iterable objects ）的。<br>
然而，普通的 JavaScript 对象默认是不可迭代的。<br>
这就是为什么你不能直接使用 `for...of` 来遍历一个普通对象。<br>
然而，我们可以通过一些方法来间接地实现这一目标，<br>
比如使用 `Object.keys`、`Object.values` 或 `Object.entries` 将对象的属性转换为数组，<br>
然后使用 `for...of` 进行遍历。<br>
这里原理是数组是可迭代对象。<br>
```js
const obj = { a: 1, b: 2, c: 3 };

// 遍历键
for (const key of Object.keys(obj)) {
  console.log(key, obj[key]);
}

// 遍历值
for (const value of Object.values(obj)) {
  console.log(value);
}

// 同时遍历键和值
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

// 但是真的想使用 for...of 循环，也可以通过给对象添加 Symbol.iterator 属性来使其可迭代
// 这样做改变了对象的结构，可能会带来一些意想不到的副作用
const obj = { a: 1, b: 2, c: 3 };

obj[Symbol.iterator] = function* () {
  for (const key of Object.keys(this)) {
    yield [key, this[key]];
  }
};

for (const [key, value] of obj) {
  console.log(key, value);
}

// 1、在遍历对象时，需要注意性能问题。
// 对于大型对象，使用 for...in 循环可能会更高效，因为它不需要先创建一个数组。
// 但是，for...in 循环会遍历原型链上的属性，所以可以使用 Object.hasOwnProperty() 方法来检查属性是否是对象自身的属性
// 2、在日常开发中，推荐使用 Object.entries()，因为它既简洁又灵活。
// 而且它是相对安全，关注对象本身属性的
```

### const 对象的属性可以修改吗 ?
`const` 声明的对象，它的属性是可以修改的。<br>
首先，`const` 关键字确实创建了一个常量，但这个"常量"指的是变量标识符的引用，而不是它所指向的值。<br>
对于基本数据类型（如数字、字符串），`const` 确实会阻止值的改变。<br>
但对于对象和数组这样的引用类型，情况就不同了。
```js
const myObject = { name: "Alice" };
myObject.name = "Bob"; // 这是允许的
console.log(myObject.name); // 输出: "Bob"

myObject = { name: "Charlie" }; // 这会抛出错误
// 因为 const 保证的是内存地址不变
// 而对象的属性存储在堆内存中，修改属性并不会改变对象本身的内存地址

// 如果真的想创建一个完全不可变的对象，可以使用 Object.freeze方法
// 但是这种方法仅冻结对象的第一层属性。深层冻结需要配合递归
```

### JavaScript 中 let 和 var 区别 ? 
```js
// 1、作用域不同
// var：声明的变量是函数作用域, 在整个函数中都有效
// 如果在函数外部使用 var，则变量的作用域是全局的
// let：声明的变量是块作用域, 只在最近的一对花括号 {} 内有效
if (true) {
  var a = 10;
  let b = 20;
}
console.log(a); // 10
console.log(b); // ReferenceError: b is not defined

// 2、变量提升
// var：会被提升到作用域的顶部（即可以在声明前使用，但值为 undefined），但赋值不会提升。
// let：同样会被提升，但会进入一个暂时性死区（Temporal Dead Zone, TDZ），在实际声明前访问会导致 ReferenceError
console.log(x); // undefined，因为 var 声明的 x 被提升了
var x = 5;
console.log(y); // ReferenceError: y is not defined，因为 y 处于暂时性死区
let y = 10;

// 3、重复声明
// var：允许在同一作用域内多次声明同一个变量，不会报错，后面的声明会覆盖前面的。
// let：在同一作用域内不允许重复声明同一个变量，会导致报错。
var a = 1;
var a = 2; // 允许，a 的值被覆盖为 2
let b = 1;
let b = 2; // SyntaxError: Identifier 'b' has already been declared

// 4、全局对象属性
// var：在全局作用域中声明的变量，会成为全局对象的属性（如浏览器中的 window 对象）。
// let：即使在全局作用域中声明，变量也不会成为全局对象的属性。
var a = 10;
console.log(window.a); // 10
let b = 20;
console.log(window.b); // undefined
```