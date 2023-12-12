/**
 *
 * 面试题
 *
 * 函数中的this指向谁
 * 指向该函数本身，也就是该函数的实例对象
 * 指向隐式原形__proto__
 *
 * 原形链继承
 * 继承属性，在子函数里call父函数，把子函数this传进call函数
 * 继承方法，父函数的prototype属性，赋值给子函数的prototype属性，
 * 在new子函数之前赋值。
 *
 * 闭包
 * 解释，外部函数的执行完后，外部函数的作用域没有被内存回收。
 *
 * 闭包的作用，实现数据私有，闭包区域的数据可以不被其他地方访问，
 * 不会造成全局变量污染
 *
 * 什么是原型和原型链
 * 原形，构造函数prototype指向的对象就是原形。
 * 显示原形，构造函数.prototype
 * 隐式原形，实例对象.__proto__
 * 显示原形 === 隐式原形
 *
 * 原形链，
 * 访问对象属性和方法时，会从实例的__proto__去找，
 * __ptoto__指向构造函数的prototype属性。
 * 如果自身__proto__找不到。就向__proto__中的____proto__去找，
 * 这样就会链式的向上去找。
 *
 * 实现一个new函数
 * function newFn(constrouctor: any, ...arg: any[]) {
 *  let obj = {};
 *  obj.__proto__ = constrouctor.prototype;
 *  constrouctor.apply(obj, arg);
 *  return obj;
 * }
 * 
 */

function newFn(constrouctor: any, ...arg: any[]) {
  let obj = {};
  //绑定原形
  obj.__proto__ = constrouctor.prototype;
  constrouctor.apply(obj, arg);
  return obj;
}

// function A(this: any) {
//   this.name = "a";
// }
// A.prototype.sayName = function () {
//   console.log(this.name);
// };

// function B() {
//   A.call(this);
//   this.name = "b";
// }

// B.prototype = A.prototype;
// let b = new B();
