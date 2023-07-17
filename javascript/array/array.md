# Array

## Array.concat
连接一个或多个数组、值，并返回新的数组。

```ts
  # Array.concat(...items: (T | ConcatArray<T>)[]): T[]

  const a = [1]
  const b = [2, 3]
  const c = [4, 5]
  a.concat(b, c)
  // => [1, 2, 3, 4]
  a.concat(2, 3)
  // => [1, 2, 3]
```

## Array.join
用指定的间隔符来连接数组内容，返回连接后的字符串。

```ts
  # Array.join(separator?: string): string

  const a = [1, 2, '3']
  a.join(',')
  // => '1,2,3'
```

## Array.pop
删除数组的最后一位元素，并返回该元素，将修改原数组。

```ts
  # Array.pop(): T | undefined

  const a = [1, 2, 3]
  const arr2 = arr1.pop()

  a.pop()
  // => 3, a = [1, 2]
```

## Array.push
向数组末尾追加元素，并返回新的长度，将修改原数组。

```ts
  # Array.push(...items: T[]): number

  const a = [1, 2]
  a.push(3)
  // => 3, a = [1, 2, 3]
```

## Array.sort
对数组进行适当排序，返回当前数组的引用，将修改原数组。
 * < 0 a会在b之前
 * > 0 b会在a之前
 * = 0 相对位置不变

```ts
  # Array.sort(compareFn?: (a: T, b: T) => number): this

  //把4 5 排到最前面
  const t = [7, 5, 1, 4]
  t.sort((a, b) => {
    if (a === 4 || a === 5) {
      return -1
    }
    return 1
  })
  // => [4, 5, 7, 1]
  t.sort((a, b) => a - b)
  // => [1, 4, 5, 7]
```