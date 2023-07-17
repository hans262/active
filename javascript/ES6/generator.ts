/**

朋友聚会去饭馆，点好菜可以有两种吃法，第一种，等菜上完大家动筷子，
第二种，上一道吃一道。如果按第一种吃法，吃饭的程序要等待做饭的程序（饭馆）全部执行完；
按第二种吃法，吃饭的程序和做饭的程序就完成了解耦，做饭的做他的，快或者慢，只要上，吃饭的就吃，
不依赖一个最终状态。这两种方法不改变菜的品种质量。但流程效益却不同，
如果上一道吃一道，吃完的盘子就可以清掉，如果按第一种吃法，上到中间发现桌子不够大，
盘子要叠罗汉。而且第一种吃法，喜欢吃某个菜的朋友可以先吃到，不必死等流口水。如果点三道菜，
两种吃法或许没太大差异。但是你想像一下，假设点了3000道菜，两种吃法的效率当下立现，
如果按第一种吃法，大家都饿死了，即使做好了，桌子（内存）也放不下。
我上面说解耦，并不完全准确，准确得说，吃饭的程序不再依赖于整桌菜，而只依赖于下一道菜，
而依赖于前者往往空间和时间效益都低，而依赖于后者较高。这是generator的实际意义，
在值的使用者和值的生产者之间，建立效益更高的依赖，规避效益不高的依赖。理解概念先，
再去理解概念的应用。


generator 让函数分段执行
yield是分段符号

 */

namespace Test {
  /**食谱 */
  const CookBook = {
    yxrs: { id: 1, time: 2, name: '鱼香肉丝' },
    dcf: { id: 2, time: 2, name: '蛋炒饭' },
    css: { id: 3, time: 1, name: '炒时蔬' },
    gyhc: { id: 4, time: 5, name: '肝腰合炒' },
    hbyh: { id: 5, time: 5, name: '火爆腰花' },
    mf: { id: 6, time: 1, name: '米饭' },
    zcdht: { id: 7, time: 2, name: '紫菜蛋花汤' },
    xhscd: { id: 8, time: 2, name: '西红柿炒蛋' },
  } as const

  /**
   * 烹饪
   * @param type 
   */
  function cooking(type: keyof typeof CookBook) {
    const tmp = CookBook[type]
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(tmp.name)
      }, tmp.time * 1000)
    })
  }

  function run(gen: () => Generator<Promise<string>>) {
    const g = gen()
    function next(data?: string): any {
      const tmp = g.next(data)
      const { done, value } = tmp
      if (done) return value
      if (value instanceof Promise) {
        value.then(data => {
          next(data)
        })
      }
    }
    next()
  }

  /**点菜 */
  run(function* (): Generator<Promise<string>, string> {
    console.log('开始做饭')
    const res1 = yield cooking('yxrs')
    console.log(res1)
    const res2 = yield cooking('mf')
    console.log(res2)
    return 'done'
  })
}