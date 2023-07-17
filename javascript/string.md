# String

## includes
判断字符串是否包含指定字符串

```ts
  # String.includes(searchString: string, position?: number | undefined): boolean

  const str = 'hello world'
  console.log(str.includes('hello'))
  // => true
```

## split
分割字符串

```ts
  # String.split(separator: string | RegExp, limit?: number | undefined): string[]
  
  const str='hello world'
  console.log(str.split(' '))
  // => ['hello', 'world']
```

## padStart/padEnd
字符串长度补全

```ts
  # String.padStart(maxLength: number, fillString?: string | undefined): string
  # String.padEnd(maxLength: number, fillString?: string | undefined): string

  const str='8'
  console.log(str.padStart(2,'0'))
  // => 08
  console.log(str.padStart(3,'0'))
  // => 008
  console.log(str.padEnd(2,'0'))
  // => 80
```
