import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const uninvoicedListFetch = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.UNINVOICED_LIST, { params: data })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.UNINVOICED_LIST
    })
  }
}
export const uninvoicedCreateAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.UNINVOICED_CREATE, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.UNINVOICED_CREATE
    })
  }
}

export const uninvoicedUpdateAction = ([id, data]) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.UNINVOICED_UPDATE, id), data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.UNINVOICED_UPDATE
    })
  }
}

export const uninvoicedItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.UNINVOICED_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.UNINVOICED_ITEM
    })
  }
}

export const uninvoicedDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.UNINVOICED_DELETE, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.UNINVOICED_DELETE
    })
  }
}
