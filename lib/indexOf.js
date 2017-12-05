function indexOf(array, element) {
  if (!Array.isArray(array)) return -1
  if (array.length === 0) return -1
  let index = 0
  while (index < array.length) {
    if (element === array[index]) return index
    index += 1
  }
  return -1
}
