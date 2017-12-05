function map(array, callback) {
  if (array === null) return []
  const newArray = []
  let index = 0
  while (index < array.length) {
    const newValue = callback(array[index])
    newArray.push(newValue)
    index += 1
  }
  return newArray
}
