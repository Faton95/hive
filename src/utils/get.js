import {
  curry,
  compose,
  prop,
  defaultTo,
  path,
  pick,
  filter,
  keys,
  length,
  pathOr,
  split,
  propOr,
  map,
  not,
  startsWith,
  fromPairs,
  has,
  head,
  pipe,
  isEmpty,
  isNil
} from 'ramda'
import moment from 'moment'
import { getSearchParam, parseParams } from './urls'
import { mapParamsToRequest, mapStrToBoolean, decodeURLParams } from './mapper'
import toSnakeCase from './toSnakeCase'

export const getIdFromProps = curry((paramName, props) =>
  compose(
    parseInt,
    pathOr(0, ['match', 'params', paramName])
  )(props)
)

export const getParamsFormHistory = compose(
  parseParams,
  path(['location', 'search'])
)

export const getParamFromHistory = curry((key, history) =>
  compose(
    prop(key),
    parseParams,
    path(['location', 'search'])
  )(history)
)

export const getSelectedFromHistory = compose(
  map(Number),
  filter(
    compose(
      not,
      isNaN,
      parseInt
    )
  ),
  split('-'),
  propOr('', 'selected'),
  parseParams,
  path(['location', 'search'])
)
const orderingMapper = item => {
  if (startsWith('-', item)) {
    return [item.slice(1), 'asc']
  }
  return [item, 'desc']
}

export const getOrderingFromHistory = compose(
  fromPairs,
  map(orderingMapper),
  split(','),
  propOr('', 'ordering'),
  parseParams,
  path(['location', 'search'])
)

export const getParamsCountFromHistory = curry((fields, history) =>
  compose(
    length,
    keys,
    filter(Boolean),
    pick(fields),
    parseParams,
    path(['location', 'search'])
  )(history)
)

export const getInitValuesFromHistory = curry((fields, history) =>
  compose(
    filter(Boolean),
    pick(fields),
    parseParams,
    path(['location', 'search'])
  )(history)
)

export const getDataFromState = curry((name, state) => ({
  loading: path([name, 'loading'], state),
  failed: path([name, 'failed'], state),
  data: path([name, 'data'], state),
  results: pathOr([], [name, 'data', 'results'], state)
}))

export const getBooleanFromHistory = curry((name, history) =>
  compose(
    mapStrToBoolean,
    defaultTo('false'),
    prop(name),
    parseParams,
    path(['location', 'search'])
  )(history)
)

export const getListParamsFromProps = compose(
  mapParamsToRequest,
  decodeURLParams,
  getParamsFormHistory,
  prop('history')
)

export const get2D = num => {
  if (num.toString().length < 2) {
    return '0' + num
  }
  return num.toString()
}

export const getDuration = seconds => {
  const secs = get2D(seconds % 60)
  const mins = get2D(Math.floor(seconds / 60))

  return `${mins}:${secs}`
}
const isObject = obj => typeof obj === 'object'
const isNotObject = obj => typeof obj !== 'object'
const isNotEmptyObj = obj => isObject(obj) && !isEmpty(obj)
const filterArray = filter(item => isNotObject(item) || isNotEmptyObj(item))

export const getSerializedData = (fields, data) =>
  compose(
    toSnakeCase,
    fromPairs,
    map(key => {
      const defaultValue = prop(key, data)
      const isArray = Array.isArray(defaultValue)
      if (isArray) {
        const arrValue = filterArray(defaultValue)
        const hasId = pipe(
          head,
          defaultTo({}),
          has('id')
        )(arrValue)
        if (hasId) return [key, arrValue.map(prop('id'))]
        return [key, arrValue]
      }
      const values = pathOr(defaultValue, [key, 'id'], data)

      return [key, values]
    })
  )(fields)

export const getIdForInitValues = (data, keys) => pipe(
  map(key => {
    const value = prop(key, data)
    if (isNil(value)) {
      return null
    } else if (isNaN(value)) {
      return [key, { id: value }]
    } else {
      return [key, { id: Number(value) }]
    }
  }),
  filter(pipe(isNil, not)),
  fromPairs
)(keys)

export const getNormalizedDuration = time =>
  (time && time.length === 5 && `${time}:00`) || time

const dateFormat = 'YYYY-MM-DD'

const defaultDate = moment().format(dateFormat)
export const getDateFromUrl = location => {
  return getSearchParam('date', path(['search'], location)) || defaultDate
}

export const getItemFromTree = (arr, target) => {
  for (let i in arr) {
    const a = arr[i]
    if (a.id === target) {
      return a
    }
    if (Array.isArray(a.children)) {
      const child = getItemFromTree(a.children, target)
      if (child !== null) {
        return child
      }
    }
  }
  return null
}
