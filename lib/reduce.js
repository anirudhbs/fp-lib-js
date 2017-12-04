function reduce(array, fxn, accumulator) {
  if (array.length === 0) return accumulator
  const current = array.shift()
  accumulator = fxn(accumulator, current)
  return reduce(array, fxn, accumulator)
}

const value = reduce([1, 2, 3, 4], (accumulator, current) => accumulator + current, 0)
console.log(value)
