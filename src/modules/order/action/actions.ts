import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const orderListFetch = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.ORDER_LIST)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ORDER_LIST
    })
  }
}
export const orderItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.ORDER_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ORDER_ITEM
    })
  }
}
