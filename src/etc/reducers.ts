import { combineReducers } from 'redux'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { compose, forEach, toPairs } from 'ramda'
import { TOrderItem } from 'types/models'
import createThunkReducer from '../utils/createThunkReducer'
import * as actionTypes from '../constants/actionTypes'
import * as stateNames from '../constants/stateNames'
import { AsyncReducers, TGetDataFromState } from '../types'
import confirmDialogReducer from '../components/ConfirmDialog/reducer'


const LOGIN = 'login'

export type RootState = {
  orderList: TGetDataFromState<TOrderItem>;
  login: TGetDataFromState<any>;
  userInfo: any
}

export const makeRootReducer = (asyncReducers: AsyncReducers) =>
  combineReducers({
    confirmDialog: confirmDialogReducer,
    [stateNames.LOGIN]: createThunkReducer(actionTypes.LOGIN),
    [stateNames.USER_INFO]: createThunkReducer(actionTypes.USER_INFO),
    [stateNames.ORDER_LIST]: createThunkReducer(actionTypes.ORDER_LIST),
    [stateNames.ORDER_CREATE]: createThunkReducer(actionTypes.ORDER_CREATE),
    [stateNames.ORDER_ITEM]: createThunkReducer(actionTypes.ORDER_ITEM),
    [stateNames.ORDER_UPDATE]: createThunkReducer(actionTypes.ORDER_UPDATE),
    [stateNames.ORDER_DELETE]: createThunkReducer(actionTypes.ORDER_DELETE),

    [stateNames.STAFF_LIST]: createThunkReducer(actionTypes.STAFF_LIST),
    [stateNames.STAFF_CREATE]: createThunkReducer(actionTypes.STAFF_CREATE),
    [stateNames.STAFF_ITEM]: createThunkReducer(actionTypes.STAFF_ITEM),
    [stateNames.STAFF_UPDATE]: createThunkReducer(actionTypes.STAFF_UPDATE),
    [stateNames.STAFF_DELETE]: createThunkReducer(actionTypes.STAFF_DELETE),

    [stateNames.TAGS_LIST]: createThunkReducer(actionTypes.TAGS_LIST),
    [stateNames.TAGS_CREATE]: createThunkReducer(actionTypes.TAGS_CREATE),
    [stateNames.TAGS_ITEM]: createThunkReducer(actionTypes.TAGS_ITEM),
    [stateNames.TAGS_UPDATE]: createThunkReducer(actionTypes.TAGS_UPDATE),
    [stateNames.TAGS_DELETE]: createThunkReducer(actionTypes.TAGS_DELETE),

    [stateNames.CURRENCY_LIST]: createThunkReducer(actionTypes.CURRENCY_LIST),
    [stateNames.CURRENCY_CREATE]: createThunkReducer(actionTypes.CURRENCY_CREATE),
    [stateNames.CURRENCY_ITEM]: createThunkReducer(actionTypes.CURRENCY_ITEM),
    [stateNames.CURRENCY_UPDATE]: createThunkReducer(actionTypes.CURRENCY_UPDATE),
    [stateNames.CURRENCY_DELETE]: createThunkReducer(actionTypes.CURRENCY_DELETE),

    [stateNames.BRANCH_LIST]: createThunkReducer(actionTypes.BRANCH_LIST),
    [stateNames.BRANCH_CREATE]: createThunkReducer(actionTypes.BRANCH_CREATE),
    [stateNames.BRANCH_ITEM]: createThunkReducer(actionTypes.BRANCH_ITEM),
    [stateNames.BRANCH_UPDATE]: createThunkReducer(actionTypes.BRANCH_UPDATE),
    [stateNames.BRANCH_DELETE]: createThunkReducer(actionTypes.BRANCH_DELETE),

    [stateNames.GROUP_LIST]: createThunkReducer(actionTypes.GROUP_LIST),
    [stateNames.GROUP_CREATE]: createThunkReducer(actionTypes.GROUP_CREATE),
    [stateNames.GROUP_ITEM]: createThunkReducer(actionTypes.GROUP_ITEM),
    [stateNames.GROUP_UPDATE]: createThunkReducer(actionTypes.GROUP_UPDATE),
    [stateNames.GROUP_DELETE]: createThunkReducer(actionTypes.GROUP_DELETE),

    [stateNames.CONTRACT_LIST]: createThunkReducer(actionTypes.CONTRACT_LIST),
    [stateNames.CONTRACT_CREATE]: createThunkReducer(actionTypes.CONTRACT_CREATE),
    [stateNames.CONTRACT_ITEM]: createThunkReducer(actionTypes.CONTRACT_ITEM),
    [stateNames.CONTRACT_UPDATE]: createThunkReducer(actionTypes.CONTRACT_UPDATE),
    [stateNames.CONTRACT_DELETE]: createThunkReducer(actionTypes.CONTRACT_DELETE),

    [stateNames.PERMISSION_LIST]: createThunkReducer(actionTypes.PERMISSION_LIST),
    [stateNames.PERMISSION_CREATE]: createThunkReducer(actionTypes.PERMISSION_CREATE),
    [stateNames.PERMISSION_ITEM]: createThunkReducer(actionTypes.PERMISSION_ITEM),
    [stateNames.PERMISSION_UPDATE]: createThunkReducer(actionTypes.PERMISSION_UPDATE),
    [stateNames.PERMISSION_DELETE]: createThunkReducer(actionTypes.PERMISSION_DELETE),

    [stateNames.CLIENT_LIST]: createThunkReducer(actionTypes.CLIENT_LIST),
    [stateNames.CLIENT_CREATE]: createThunkReducer(actionTypes.CLIENT_CREATE),
    [stateNames.CLIENT_ITEM]: createThunkReducer(actionTypes.CLIENT_ITEM),
    [stateNames.CLIENT_UPDATE]: createThunkReducer(actionTypes.CLIENT_UPDATE),
    [stateNames.CLIENT_DELETE]: createThunkReducer(actionTypes.CLIENT_DELETE),

    [stateNames.OUTSOURCE_LIST]: createThunkReducer(actionTypes.OUTSOURCE_LIST),
    [stateNames.OUTSOURCE_CREATE]: createThunkReducer(actionTypes.OUTSOURCE_CREATE),
    [stateNames.OUTSOURCE_ITEM]: createThunkReducer(actionTypes.OUTSOURCE_ITEM),
    [stateNames.OUTSOURCE_UPDATE]: createThunkReducer(actionTypes.OUTSOURCE_UPDATE),
    [stateNames.OUTSOURCE_DELETE]: createThunkReducer(actionTypes.OUTSOURCE_DELETE),

    [stateNames.POSITION_LIST]: createThunkReducer(actionTypes.POSITION_LIST),
    [stateNames.POSITION_CREATE]: createThunkReducer(actionTypes.POSITION_CREATE),
    [stateNames.POSITION_ITEM]: createThunkReducer(actionTypes.POSITION_ITEM),
    [stateNames.POSITION_UPDATE]: createThunkReducer(actionTypes.POSITION_UPDATE),
    [stateNames.POSITION_DELETE]: createThunkReducer(actionTypes.POSITION_DELETE),

    [stateNames.ASSIGNMENT_LIST]: createThunkReducer(actionTypes.ASSIGNMENT_LIST),
    [stateNames.ASSIGNMENT_CREATE]: createThunkReducer(actionTypes.ASSIGNMENT_CREATE),
    [stateNames.ASSIGNMENT_ITEM]: createThunkReducer(actionTypes.ASSIGNMENT_ITEM),
    [stateNames.ASSIGNMENT_UPDATE]: createThunkReducer(actionTypes.ASSIGNMENT_UPDATE),
    [stateNames.ASSIGNMENT_DELETE]: createThunkReducer(actionTypes.ASSIGNMENT_DELETE),

    [stateNames.BANK_ACCOUNT_LIST]: createThunkReducer(actionTypes.BANK_ACCOUNT_LIST),
    [stateNames.BANK_ACCOUNT_CREATE]: createThunkReducer(actionTypes.BANK_ACCOUNT_CREATE),
    [stateNames.BANK_ACCOUNT_ITEM]: createThunkReducer(actionTypes.BANK_ACCOUNT_ITEM),
    [stateNames.BANK_ACCOUNT_UPDATE]: createThunkReducer(actionTypes.BANK_ACCOUNT_UPDATE),
    [stateNames.BANK_ACCOUNT_DELETE]: createThunkReducer(actionTypes.BANK_ACCOUNT_DELETE),

    [stateNames.FEE_LIST]: createThunkReducer(actionTypes.FEE_LIST),
    [stateNames.FEE_CREATE]: createThunkReducer(actionTypes.FEE_CREATE),
    [stateNames.FEE_ITEM]: createThunkReducer(actionTypes.FEE_ITEM),
    [stateNames.FEE_UPDATE]: createThunkReducer(actionTypes.FEE_UPDATE),
    [stateNames.FEE_DELETE]: createThunkReducer(actionTypes.FEE_DELETE),

    [stateNames.EXPENSE_LIST]: createThunkReducer(actionTypes.EXPENSE_LIST),
    [stateNames.EXPENSE_CREATE]: createThunkReducer(actionTypes.EXPENSE_CREATE),
    [stateNames.EXPENSE_ITEM]: createThunkReducer(actionTypes.EXPENSE_ITEM),
    [stateNames.EXPENSE_UPDATE]: createThunkReducer(actionTypes.EXPENSE_UPDATE),
    [stateNames.EXPENSE_DELETE]: createThunkReducer(actionTypes.EXPENSE_DELETE),

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
