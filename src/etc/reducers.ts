import { combineReducers } from 'redux'
import { useSelector, useDispatch,TypedUseSelectorHook } from 'react-redux'
import { compose, forEach, toPairs } from 'ramda'
import createThunkReducer from '../utils/createThunkReducer'
import * as actionTypes from '../constants/actionTypes'
import * as stateNames from '../constants/stateNames'
import { AsyncReducers, TGetDataFromState } from '../types'

const LOGIN = 'login'
export type RootState = {
  orderList: TGetDataFromState;
  login: TGetDataFromState;
}

export const makeRootReducer = (asyncReducers: AsyncReducers) =>
  combineReducers({
    [LOGIN]: createThunkReducer(actionTypes.LOGIN),
    [stateNames.ORDER_LIST]: createThunkReducer(actionTypes.ORDER_LIST),
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

type ThunkResult<R> = {
    type: string;
    value: object;
}
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const usePromiseDispatch: () => (action: any) => Promise<ThunkResult<any>> = useDispatch
