/**
 * 交叉类型 -> Intersection Types
 *
 * 将多个类型合并为一个类型
 * 它包含了所需的所有类型的特性。
 * 应用场景：混入
 *
 */

namespace TestIntersectionTypes {
  interface User {
    name: string;
    age: number;
  }

  type MyUser = User & { location: string };

  const user: MyUser = {
    name: "hans",
    age: 22,
    location: "shanghai",
  };
}
