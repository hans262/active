namespace BestPractices {
  /**
   * 根据参数动态获取返回类型
   */

  type BodyRet<T> = T extends "string"
    ? string
    : T extends "buffer"
    ? Buffer
    : never;

  function getBody<T extends "string" | "buffer">(type: T) {
    let ret = "hello word";
    return new Promise<BodyRet<T>>((resolve) => {
      if (type === "buffer") {
        resolve(Buffer.from(ret) as BodyRet<T>);
      }
      if (type === "string") {
        resolve(ret as BodyRet<T>);
      }
    });
  }

  let pb = getBody("buffer");
  let ps = getBody("string");
}
