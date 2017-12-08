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

  reduce: (array, callback, accumulator) => {
    if (array.length === 0) return accumulator
    const current = array.shift()
    return util.reduce(array, callback, callback(accumulator, current))
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

  concatArrays: (array1, array2) => [...array1, ...array2],

  flatten: (array, depth = 1, newArray = []) => {
    if (array.length === 0) return newArray
    const current = array.shift()
    if (!Array.isArray(current)) {
      newArray.push(current)
      return util.flatten(array, depth, newArray)
    }
    if (depth === 0) {
      newArray.push(current)
      return util.flatten(array, depth, newArray)
    }
    const curArray = util.flatten(current, depth - 1)
    return util.flatten(array, depth - 1, [...newArray, ...curArray])
  },

  isString: value => typeof value === 'string',

  isNumber: value => typeof value === 'number',

  isBoolean: value => typeof value === 'boolean',

  flatMap: (array, callback) => {
    const newArray = util.flatten(array)
    const res = util.map(newArray, callback)
    return res
  },

  arrayLength: value => (Array.isArray(value) ? value.length : undefined),

  includes: (array, value) => {
    if (array.length === 0) return false
    const res = array.reduce((acc, cur) => acc || (cur === value), false)
    return res
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
    return util.includes(Object.keys(object), key)
  },

  difference: (array1, ...array2) => {
    const newArrays = util.flatten(array2, 2)
    const diff = array1.filter(current => !util.includes(newArrays, current))
    return diff
  },

  intersection: (array1, ...array2) => {
    const newArrays = util.flatten(array2, 2)
    const diff = array1.filter(current => util.includes(newArrays, current))
    return diff
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

  isThisNaN: value => value !== value,

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
    return result.length !== 0
  },

  reduceRight: (array, callback, accumulator) => {
    if (array.length === 0) return accumulator
    const current = array.pop()
    return util.reduceRight(array, callback, callback(accumulator, current))
  },

  howMany: (string, sub) => {
    if (typeof string !== 'string' || typeof string !== 'string') return undefined
    const regex = new RegExp(sub, 'g')
    const count = string.match(regex)
    if (count) return count.length
    return 0
  },

  without: (array, ...elements) => {
    const remove = util.flatten(elements)
    const newArray = array.filter(cur => !remove.includes(cur))
    return newArray
  },

  fillArray: (min, max, accumulator = []) => {
    if (min === max) return accumulator
    accumulator.push(min)
    return util.fillArray(min + 1, max, accumulator)
  },

  random: (min, max = null) => {
    let array = []
    if (max === null) array = util.fillArray(0, min)
    else array = util.fillArray(min, max)
    return array[Math.floor(Math.random() * array.length)]
  }
}

exports.util = util
