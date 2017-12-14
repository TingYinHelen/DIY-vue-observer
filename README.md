# DIY-vue-observer
#### 自己动手做一个vue的简易数据响应
实现功能如下：
```
let data = {
    name: 'Helen',
    age: 100,
    boyf: {
      name: 'Glowd',
      age: 200
    }
}

observer(data)

new Watchr('age', () => {
    console.log(1)
})
new Watchr('boyf.age', () => {
    console.log('change')
})

setTimeout(() => {
  data.boyf.age = 18
}, 1000)
```
在node环境下运行
