const util = {
  filter: (array, predicate, newArray = []) => {
    if (array.length === 0) return newArray
    const current = array.shift()
    if (predicate(current)) newArray.push(current)
    return util.filter(array, predicate, newArray)
  },

  indexOfElement: (array, value, index = 0) => {
    if (!Array.isArray(array)) return undefined
    if (array.length === 0) return -1
    const current = array.shift()
    if (current === value) return index
    return util.indexOfElement(array, value, index + 1)
  },

  reduce: (array, callback, accumulator, currentValue = array[0], currentIndex = 0) => {
    if (util.arrayLength(array) === currentIndex) return accumulator
    const newAccumulator = callback(accumulator, currentValue)
    return util.reduce(array, callback, newAccumulator, array[currentIndex + 1], currentIndex + 1)
  },

  map: (array, callback, newArray = []) => {
    if (array.length === 0) return newArray
    const current = array.shift()
    const newValue = callback(current)
    return util.map(array, callback, [...newArray, newValue])
  },

  sliceString: (string, startIndex = 0, endIndex = string.length, newString = '') => {
    if (typeof string !== 'string') return undefined
    if (startIndex === endIndex) return newString
    return util.sliceString(string, startIndex + 1, endIndex, newString + string[startIndex])
  },

  reverseArray: (array, resultArray = []) => {
    if (!Array.isArray(array)) return undefined
    if (array.length === 0) return resultArray
    resultArray.push(array.pop())
    return util.reverseArray(array, resultArray)
  },

  flip: (...a) => util.reverseArray(...a),

  concat: (array1, array2) => [...array1, ...array2],

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
    if (!Array.isArray(array)) return undefined
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
    if (typeof string !== 'string') return undefined
    if (string[0] !== ' ') return string
    return util.trimStart(util.sliceString(string, 1))
  },

  trimEnd: (string) => {
    if (typeof string !== 'string') return undefined
    if (!util.stringEndsWith(string, ' ')) return string
    return util.trimEnd(util.sliceString(string, 0, string.length - 1))
  },

  trim: string => util.trimEnd(util.trimStart(string)),

  isObject: (value) => {
    if (Array.isArray(value)) return false
    return typeof value === 'object'
  },

  isEmptyObject: value => JSON.stringify(value) === JSON.stringify({}),

  sum: (array) => {
    if (!Array.isArray(array)) return undefined
    return util.reduce(array, (acc, cur) => acc + cur, 0)
  },

  leftPad: (string, count, char = ' ') => {
    if (string.length === count) return string
    return util.leftPad(char + string, count, char)
  },

  rightPad: (string, count, char = ' ') => {
    if (string.length === count) return string
    return util.rightPad(string + char, count, char)
  },

  drop: (array, start = 1) => {
    if (start === 0) return array
    const [, ...newArray] = [...array]
    return util.drop(newArray, start - 1)
  },

  dropRight: (array, start = 1) => array.slice(0, array.length - start),

  sliceArray: (array, startIndex = 0, endIndex = array.length, newArray = []) => {
    if (!Array.isArray(array)) return undefined
    if (startIndex === endIndex) return newArray
    newArray.push(array[startIndex])
    return util.sliceArray(array, startIndex + 1, endIndex, newArray)
  },

  head: array => (Array.isArray(array) ? array[0] : false),

  joinArray: (array, separator = '', string = '') => {
    if (array.length === 0) return string
    const current = array.shift()
    if (array.length === 0) return util.joinArray(array, separator, string + current)
    return util.joinArray(array, separator, string + current + separator)
  },

  hasKey: (object, key) => {
    if (object !== Object(object)) return undefined
    return util.ifExists(Object.keys(object), key)
  },

  difference: (array1, ...array2) => {
    const newArrays = util.flatten(array2)
    if (!(Array.isArray(array1) || Array.isArray(array2))) return undefined
    let index = 0
    const diffArray = []
    while (index < array1.length) {
      if (!util.ifExists(newArrays, array1[index])) diffArray.push(array1[index])
      index += 1
    }
    return diffArray
  },

  union: (array1, ...array2) => {
    const newArray = util.flatten(...array2)
    let index = 0
    const unionArray = []
    while (index < array1.length) {
      if (newArray.indexOf(array1[index]) !== -1) unionArray.push(array1[index])
      index += 1
    }
    return unionArray
  },

  isArray: array => (Object.prototype.toString.call(array) === '[object Array]'),

  partition: (array, predicate, t = [], f = []) => {
    if (array.length === 0) return { t, f }
    const current = array.shift()
    if (predicate(current)) t.push(current)
    else f.push(current)
    return util.partition(array, predicate, t, f)
  },

  stringEndsWith: (string, char) => {
    if (typeof string !== 'string' || typeof char !== 'string' || char.length !== 1) return undefined
    return string[string.length - 1] === char
  },

  isThisNaN: (value) => {
    if (value === undefined || value === {} || typeof parseInt(value) === 'number') return true
    // if (typeof value === 'boolean' || typeof value === 'number' || value === null) return false
    return false
  },

  take: (array, count, newArray = []) => {
    if (!Array.isArray(array)) return undefined
    if (count === 0 || array.length === 0) return newArray
    newArray.push(array.shift())
    return util.take(array, count - 1, newArray)
  },

  isEmptyArray: array => array.length === 0,

  dropFromStart: (array, count) => {
    if (count === 0) return array
    return util.dropFromStart(util.sliceArray(array, 1), count - 1)
  },

  any: (array, predicate) => {
    const result = util.filter(array, predicate)
    return !(result.length === 0)
  }
}

exports.util = util
