function filter(array, predicate) {
  if (array === null) return []
  const newArray = []
  let index = 0
  while (index < array.length) {
    const current = array[index]
    if (predicate(current)) newArray.push(current)
    index += 1
  }
  return newArray
}
