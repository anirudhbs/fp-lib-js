const console = require('console')

function map(arr, fxn) {
  const newArr = []
  const it = arr[Symbol.iterator]()
  for (let ar_i in arr) {
    const mod = fxn(it.next().value)
    newArr.push(mod)
  }
  return newArr
}

const newArr = map([1, 2, 3], (cur) => {
  return cur * cur
})

console.log(newArr)
