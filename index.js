function initData(data){
  observer(data)
}

function observe(data){
  new observer(data)
}

class observer{
  constructor(data){
    this.data = data
    this.walk()
  }
  walk(){
    let keys = Object.keys(this.data)
    keys.forEach( key => {
      defineReactive(this.data, key, this.data[key])
    })
  }
}

class Dep{
  constructor(){
    this.depends = []
  }
  depend(){
    this.depends.push(Watch.target)
  }
  notify(){
    for(let i = 0; i < this.depends.length; i++){
      this.depends[i].cb()
    }
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
      dep.notify()
    }
  })
}
function pushTarget(watcher){
  Watch.target = watcher
}
class Watch{
  constructor(exp, cb){
    this.exp = exp
    this.cb = cb
    pushTarget(this)
    this.value = data[exp]
  }
}


let data = {
  name: 'Helen',
  age: 28
}
observe(data)
new Watch('age', () => {
  console.log('age has been changed')
})

// new Watch('age', () => {
//   console.log(1)
// })
// new Watch('boyf.age', () => {
//   console.log('change')
// })

setTimeout(() => {
data.age = 18
}, 1000)