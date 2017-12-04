function map(array, cb) {
  let index = -1
  const length = (array === null) ? 0 : array.length
  const newArray = []

  while (index < length - 1) {
    index += 1
    const newValue = cb(array[index])
    newArray.push(newValue)
  }
  return newArray
}
