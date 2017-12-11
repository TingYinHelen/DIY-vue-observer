# DIY-vue-observer
#### 自己动手做一个vue的简易数据响应
实现功能如下：
```
let data = {
    name: 'Helen',
    age: 18,
    boyf: {
      name: 'Glowd',
      age: 28
    }
}

observer(data)

new Watch('age', () => {
    console.log(1)
})
new Watch('boyf.age', () => {
    console.log('change')
})

setTimeout(() => {
  data.boyf.age = 18
}, 1000)
```
在node环境下运行
