import axios, { getPayloadFromError, getPayloadFromSuccess } from 'utils/axios'
import * as API from 'constants/api'
import * as actionTypes from 'constants/actionTypes'
import { sprintf } from 'sprintf-js'

export const preInvoiceCreateAction = (data) => {
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

export const preInvoiceItemFetch = (id) => {
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
