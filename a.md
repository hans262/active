# 线下笔试题

## 1

```ts
type BackendUser = {
  // 用户 id 
  id: number
  // 用户 name
  name: string
  // 用户是否禁用：true 禁用，false 启用
  disabled: boolean
}

// 前端用户模型
type FrontendUser = {
  value: number
  label: string
}

let input = [{ id: 1, name: "jack", disabled: false }, { id: 2, name: "admin", disabled: true }]
let output = [{ value: 1, label: 'jack' }]

// 将后端用户列表转换成前端用户列表，只保留启用（disabled = false）的用户
function transform(users?: BackendUser[]): FrontendUser[] {
  if (!users) {
    return []
  }
  return users
    .filter(v => !v.disabled)
    .map(v => ({ value: v.id, label: v.name }))
}

console.log(transform(input))
```

## 2
```ts

// getRawData 类型为 (...args: any[]) => Promise<any>
// import { getRawData } from './services'

function getRawData(..._: any[]) {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000 * 3)
  })
}

async function getData() {
  let t = 0 //当前时间
  let data: any;

  let timer = setInterval(() => {
    t += 0.1
    // console.log(t, data)
    //超过时间限制，且没有返回
    if (t > 10) {
      clearInterval(timer)
      if (!data) {
        throw new Error('time out')
      }
    }
  }, 100)
  data = await getRawData()
}

getData()
```

## 3
```tsx

import { useState, useEffect, useCallback } from 'react'

const Component = () => {
  const [count, setCount] = useState(0)
  useEffect(() => console.log('开始计数'), [])

  const onClick = useCallback(() => {
    console.log(count)
    setCount(count + 1)
  }, [count])

  return (
    <>
      <span>{count}</span>
      <button onClick={onClick}>+1</button >
    </>
  )
}
export default Component

```

## 4
```ts
function validate(input?: string | number) {
  // todo
  if (!input) {
    throw new Error('请输入整数')
  }

  input = input.toString();

  if(!/^\d+$/.test(input)){
    throw new Error('请输入整数')
  }
}

// 用例1
try {
  validate('12.9')
} catch (e) {
  console.log(e.message)
  // 打印：只能输入整数
}

// 用例2
try {
  validate(12)
} catch (e) {
  console.log(e.message) // 不执行
}

```