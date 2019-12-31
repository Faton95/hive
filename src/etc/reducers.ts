import { combineReducers } from 'redux'
import { compose, forEach, toPairs } from 'ramda'
import { AsyncReducers } from '../types/store'

export const makeRootReducer = (asyncReducers: AsyncReducers) =>
  combineReducers({
    ...asyncReducers
  })

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const injectReducers = (store, reducers) =>
  compose(
    forEach(([key, reducer]) => injectReducer(store, { key, reducer })),
    toPairs
  )(reducers)
