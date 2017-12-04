function filter(array, predicate) {
  let index = -1
  const length = (array === null) ? 0 : array.length
  const newArray = []

  while (index < length - 1) {
    index += 1
    const current = array[index]
    if (predicate(current)) newArray.push(current)
  }
  return newArray
}
