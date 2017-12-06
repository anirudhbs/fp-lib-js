const util = {
  filter: (array, predicate) => {
    if (array === null) return undefined
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
    if (!Array.isArray(array)) return undefined
    if (array.length === 0) return -1
    let index = 0
    while (index < array.length) {
      if (element === array[index]) return index
      index += 1
    }
    return -1
  },

  reduce: (array, callback, accumulator, currentValue = array[0], currentIndex = 0) => {
    if (util.length(array) === currentIndex) return accumulator
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
    if (typeof string !== 'string') return undefined
    // if (string.length === 0) return ''
    let index = startIndex
    let newString = ''
    while (index < endIndex) {
      newString += string[index]
      index += 1
    }
    return newString
  },

  reverse: (array) => {
    if (!Array.isArray(array)) return undefined
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

  isString: value => typeof value === 'string',

  isNumber: value => typeof value === 'number',

  isBoolean: value => typeof value === 'boolean',

  flatMap: (array, callback) => {
    const newArray = util.flatten(array)
    const res = util.map(newArray, callback)
    return res
  },

  arrayLength: value => (Array.isArray(value) ? value.length : null),

  ifExists: (array, value) => {
    if (!Array.isArray(array) || array.length === 0) return null
    if (array.length === 0) return false
    const current = array.shift()
    if (current === value) return true
    return util.ifExists(array, value)
  },

  max: (array, maxVal = null) => {
    if (!Array.isArray(array)) return null
    if (array.length === 0) return maxVal
    const current = array.shift()
    if (current > maxVal) return util.max(array, current)
    return util.max(array, maxVal)
  },

  min: (array, minVal = null) => {
    if (!Array.isArray(array)) return null
    if (array.length === 0) return minVal
    const current = array.shift()
    if (current < minVal) return util.min(array, current)
    return util.min(array, minVal)
  },

  trimStart: (string) => {
    if (typeof string !== 'string') return null
    let index = 0
    while (string[index] === ' ') index += 1
    return util.slice(string, index, string.length)
  },

  trimEnd: (string) => {
    if (typeof string !== 'string') return null
    let index = string.length - 1
    while (string[index] === ' ') index -= 1
    return util.slice(string, 0, index + 1)
  },

  trim: (string) => {
    const front = util.trimStart(string)
    return util.trimEnd(front)
  },

  isObject: (value) => {
    if (Array.isArray(value)) return false
    if (typeof value === 'object') return true
    return false
  },

  isEmptyObject: value => JSON.stringify(value) === JSON.stringify({}),

}

exports.util = util
