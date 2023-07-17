# Window

## encodeURI/decodeURI | encodeURIComponent/decodeURIComponent
判断字符串是否包含指定字符串

```ts
  # encodeURI(uri: string): string
  # decodeURI(encodedURI: string): string

  const uri='https://www.baidu.com/我的'
  const ec=encodeURI(uri)
  console.log(ec)
  // => https://www.baidu.com/%E6%88%91%E7%9A%84
  console.log(decodeURI(ec))
  // => https://www.baidu.com/我的
  
  const ecc=encodeURIComponent(myUri)
  console.log(ecc)
  // => https%3A%2F%2Fwww.baidu.com%2F%E6%88%91%E7%9A%84
  console.log(decodeURIComponent(ecc))
  // => https://www.baidu.com/我的
```

## eval
执行一段js代码

```ts
  # eval(x: string): any

  console.log(eval('9+5'))
  // => 14
```