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
    const newAccumulator = callback(accumulator, currentValue)
    return util.reduce(array, callback, newAccumulator, array[currentIndex + 1], currentIndex + 1)
  },

  map: (array, callback, newArray = []) => {
    if (array.length === 0) return newArray
    const current = array.shift()
    const newValue = callback(current)
    return util.map(array, callback, [...newArray, newValue])
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

  flip: (...a) => util.reverse(...a),

  concat: (array1, array2) => {
    const newArray = array1
    let index = 0
    while (index < array2.length) {
      newArray.push(array2[index])
      index += 1
    }
    return newArray
  },

  flatten: (array, depth = 1) => {
    const newArray = []
    let index = 0
    while (index < array.length) {
      if (!Array.isArray(array[index])) {
        newArray.push(array[index])
      } else if (depth !== 0) {
        const flattened = util.flatten(array[index], depth - 1)
        let subIndex = 0
        while (subIndex < flattened.length) {
          newArray.push(flattened[subIndex])
          subIndex += 1
        }
      } else {
        newArray.push(array[index])
      }
      index += 1
    }
    return newArray
  },

  isString: (value) => {
    if (value === null) return false
    if (Object.getPrototypeOf(value) === String.prototype) return true
    return false
  },

  isNumber: (value) => {
    if (value === null) return false
    if (Object.getPrototypeOf(value) === Number.prototype) return true
    return false
  },

  isBoolean: (value) => {
    if (typeof value === 'boolean') return true
    return false
  },

  flatMap: (array, callback) => {
    const newArray = util.flatten(array)
    const res = util.map(newArray, callback)
    return res
  },
}

exports.util = util
