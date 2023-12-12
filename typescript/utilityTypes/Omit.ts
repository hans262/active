/**
 * Omit ->
 * 从一个对象中排出一些属性，
 * 得到新的类型
 */

namespace TestOmit {
  interface User {
    name: string;
    age: number;
    location: string;
  }

  type MyUser = Omit<User, "location">;
}
