import * as stateNames from 'constants/stateNames'
import * as actionTypes from 'constants/actionTypes'
import { createPostThunkReducer, createGetThunkReducer } from 'utils/createThunkReducer'

export default {
  [stateNames.TIME_SHEET_LIST]: createGetThunkReducer(actionTypes.TIME_SHEET_LIST),
  [stateNames.TIME_SHEET_CREATE]: createPostThunkReducer(actionTypes.TIME_SHEET_CREATE),
  [stateNames.TIME_SHEET_ITEM]: createGetThunkReducer(actionTypes.TIME_SHEET_ITEM),
  [stateNames.TIME_SHEET_UPDATE]: createPostThunkReducer(actionTypes.TIME_SHEET_UPDATE),
  [stateNames.TIME_SHEET_DELETE]: createPostThunkReducer(actionTypes.TIME_SHEET_DELETE),

  [stateNames.UNINVOICED_LIST]: createGetThunkReducer(actionTypes.UNINVOICED_LIST),
  [stateNames.UNINVOICED_CREATE]: createPostThunkReducer(actionTypes.UNINVOICED_CREATE),
  [stateNames.UNINVOICED_ITEM]: createGetThunkReducer(actionTypes.UNINVOICED_ITEM),
  [stateNames.UNINVOICED_UPDATE]: createPostThunkReducer(actionTypes.UNINVOICED_UPDATE),
  [stateNames.UNINVOICED_DELETE]: createPostThunkReducer(actionTypes.UNINVOICED_DELETE),

  [stateNames.INVOICE_LIST]: createGetThunkReducer(actionTypes.INVOICE_LIST),
  [stateNames.INVOICE_CREATE]: createPostThunkReducer(actionTypes.INVOICE_CREATE),
  [stateNames.INVOICE_ITEM]: createGetThunkReducer(actionTypes.INVOICE_ITEM),
  [stateNames.INVOICE_UPDATE]: createPostThunkReducer(actionTypes.INVOICE_UPDATE),
  [stateNames.INVOICE_DELETE]: createPostThunkReducer(actionTypes.INVOICE_DELETE)
}
