const util = {
  filter: (array, predicate) => {
    if (array === null) return []
    const newArray = []
    let index = 0
    while (index < array.length) {
      const current = array[index]
      if (predicate(current)) newArray.push(current)
      index += 1
    }
    return newArray
  },

  indexOf: (array, element) => {
    if (!Array.isArray(array)) return -1
    if (array.length === 0) return -1
    let index = 0
    while (index < array.length) {
      if (element === array[index]) return index
      index += 1
    }
    return -1
  },

  reduce: (array, callback, accumulator, currentValue = array[0], currentIndex = 0) => {
    if (array.length === currentIndex) return accumulator
    accumulator = callback(accumulator, currentValue)
    return this.reduce(array, callback, accumulator, array[currentIndex], currentIndex + 1)
  },

  map: (array, callback) => {
    if (array === null) return []
    const newArray = []
    let index = 0
    while (index < array.length) {
      const newValue = callback(array[index])
      newArray.push(newValue)
      index += 1
    }
    return newArray
  },

  slice: (string, startIndex, endIndex = string.length) => {
    if (typeof string !== 'string') return ''
    if (string.length === 0) return ''
    let index = startIndex
    let newString = ''
    while (index < endIndex) {
      newString += string[index]
      index += 1
    }
    return newString
  },

  reverse: (array) => {
    if (!Array.isArray(array)) return []
    if (array.length === 0) return []
    let index = array.length - 1
    const newArray = []
    while (index > -1) {
      newArray.push(array[index])
      index -= 1
    }
    return newArray
  },

  flip: (...a) => this.reverse(a),
}

module.exports = {
  util,
}
