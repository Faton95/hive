import { combineReducers } from 'redux'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { compose, forEach, toPairs } from 'ramda'
import createThunkReducer from '../utils/createThunkReducer'
import * as actionTypes from '../constants/actionTypes'
import * as stateNames from '../constants/stateNames'
import { AsyncReducers, TGetDataFromState } from '../types'
import { TOrderItem } from 'types/models'
import confirmDialogReducer from '../components/ConfirmDialog/reducer'


const LOGIN = 'login'
export type RootState = {
  orderList: TGetDataFromState<TOrderItem>;
  login: TGetDataFromState<any>;
}

export const makeRootReducer = (asyncReducers: AsyncReducers) =>
  combineReducers({
    confirmDialog: confirmDialogReducer,
    [LOGIN]: createThunkReducer(actionTypes.LOGIN),
    [stateNames.ORDER_LIST]: createThunkReducer(actionTypes.ORDER_LIST),
    [stateNames.ORDER_CREATE]: createThunkReducer(actionTypes.ORDER_CREATE),
    [stateNames.ORDER_ITEM]: createThunkReducer(actionTypes.ORDER_ITEM),
    [stateNames.ORDER_UPDATE]: createThunkReducer(actionTypes.ORDER_UPDATE),
    [stateNames.ORDER_DELETE]: createThunkReducer(actionTypes.ORDER_DELETE),

    [stateNames.TAGS_LIST]: createThunkReducer(actionTypes.TAGS_LIST),
    [stateNames.TAGS_CREATE]: createThunkReducer(actionTypes.TAGS_CREATE),
    [stateNames.TAGS_ITEM]: createThunkReducer(actionTypes.TAGS_ITEM),
    [stateNames.TAGS_UPDATE]: createThunkReducer(actionTypes.TAGS_UPDATE),
    [stateNames.TAGS_DELETE]: createThunkReducer(actionTypes.TAGS_DELETE),
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
export type PromiseThunksResult = (action: any) => Promise<ThunkResult<any>>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const usePromiseDispatch: () => (action: any) => Promise<ThunkResult<any>> = useDispatch
