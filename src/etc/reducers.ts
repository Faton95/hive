import { combineReducers } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { compose, forEach, toPairs } from 'ramda'
import { AsyncReducers, IStore, TGetDataFromState } from '../types'

export type RootState = {
  orderList: TGetDataFromState;
}
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

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
