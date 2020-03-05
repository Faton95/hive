import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const timeSheetListFetch = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.TIME_SHEET_LIST, { params: data })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.TIME_SHEET_LIST
    })
  }
}
export const timeSheetCreateAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.TIME_SHEET_CREATE, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.TIME_SHEET_CREATE
    })
  }
}

export const timeSheetUpdateAction = ([id, data]) => {

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.TIME_SHEET_UPDATE, id), data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.TIME_SHEET_UPDATE
    })
  }
}

export const timeSheetChangeStatusAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(sprintf(API.TIME_SHEET_CHANGE_STATUS, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.TIME_SHEET_UPDATE
    })
  }
}
export const timeSheetItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.TIME_SHEET_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.TIME_SHEET_ITEM
    })
  }
}

export const timeSheetDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.TIME_SHEET_DELETE, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.TIME_SHEET_DELETE
    })
  }
}
