/**
 * watcher是一个订阅者，当watcher中订阅的属性改变的之后需要发一个通知给观察者
 * observer就是观察者，观察者应该是初始化的对象进入观察状态defineProperty
 * 并且每一个属性都应该创建一个观察者进行观察
 * 每创建一个watcher的时候，就需要收集一个依赖，把它放到一个依赖的队列里
 * 当watcher改变的时候，就去调用所有的依赖对象
 *
 * 好，这里可以看出，需要三个class: Watcher, Observer, Dep
 *
 * Dep就是需要收集依赖队列，并且至少应该有2个方法：添加依赖，广播执行所有依赖
 *
 * 在new 一个watch的时候，就添加一个依赖，要添加依赖就要触发get()，
 *
 * 注意：  每次调用一次set就会调用一次get，也就是每次广播，都会执行一次get,
 *
 */

function observe(data){
  new Observer(data)
}

class Observer{
  constructor(data){
    this.walk(data)
  }
  walk(){
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
  }
}
function isObject(val){
  if(Object.prototype.toString.call(val) == '[object Object]'){
    return true
  }
}
function defineReactive(data, key, val){
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get(){
      dep.depend()
      return val
    },
    set(newVal){
      val = newVal
      dep.notify()
    }
  })
}

class Watcher{
  constructor(exp, cb){
    this.exp = exp
    this.cb = cb
    Watcher.target = this
    if(typeof exp == 'function'){
      this.value = exp()
    }else{
      this.value = data[exp]
    }
  }
}
class Dep{
  constructor(){
    this.depends = []
  }
  depend(){
    this.depends.push(Watcher.target)
  }
  notify(){
    this.depends.forEach(depend => {
      depend.cb(depend.value)
    })
  }
}



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
let computed = {
  sum(){
    return data.a + data.b
  }
}
observe(data)
new Watcher('a', val => {
  console.log(val)
})
new Watcher(computed.sum, val => {
  console.log(val)
})
setTimeout(() => {
  data.a = 18
}, 1000)