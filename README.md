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
    },
    a: 1,
    b: 2
}
let computed: {
    sum(){
        return data.a + data.b
    }
}

observer(data)

new Watchr(computed.sum, val => {
    console.log(val)
})
new Watchr('boyf.age', () => {
    console.log('change')
})

setTimeout(() => {
  data.a = 100
}, 1000)
```
在node环境下运行
