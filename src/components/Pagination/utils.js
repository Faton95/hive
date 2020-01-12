import { __, add, curry, defaultTo, divide, pipe, range } from 'ramda'
import { getParamFromHistory } from '~/utils/get'

export const PAGE_SIZE = 10
export const ONE = 1

export const getPageList = pipe(
  divide(__, PAGE_SIZE),
  Math.ceil,
  add(ONE),
  range(ONE)
)

export const getCurrentPage = curry((key, history) =>
  pipe(
    getParamFromHistory(key),
    defaultTo(ONE),
    Number
  )(history)
)
