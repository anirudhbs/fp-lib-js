function reduce(array, callback, accumulator, currentValue = array[0], currentIndex = 0) {
  if (array.length === currentIndex) return accumulator
  accumulator = callback(accumulator, currentValue)
  currentIndex += 1
  return reduce(array, callback, accumulator, array[currentIndex], currentIndex)
}

function temp(accumulator, current) {
  return accumulator + current
}

const value = reduce([1, 2, 3, 4], temp, 0)
console.log(value)
