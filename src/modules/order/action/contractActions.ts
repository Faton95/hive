import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const contractListFetch = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.CONTRACT_LIST, { params: data })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.CONTRACT_LIST
    })
  }
}
export const contractCreateAction = (data) => {

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.CONTRACT_CREATE, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.CONTRACT_CREATE
    })
  }
}

export const contractUpdateAction = (id, data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.CONTRACT_UPDATE, id), data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.CONTRACT_UPDATE
    })
  }
}
export const contractItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.CONTRACT_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.CONTRACT_ITEM
    })
  }
}

export const contractDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.CONTRACT_DELETE, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.CONTRACT_DELETE
    })
  }
}

