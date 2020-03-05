import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const roleListFetch = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.ROLE_LIST, { params: data })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ROLE_LIST
    })
  }
}
export const roleCreateAction = (data) => {

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.ROLE_CREATE, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ROLE_CREATE
    })
  }
}

export const roleUpdateAction = (id, data) => {

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.ROLE_UPDATE, id), data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ROLE_UPDATE
    })
  }
}
export const roleItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.ROLE_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ROLE_ITEM
    })
  }
}

export const roleDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.ROLE_DELETE, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.ROLE_DELETE
    })
  }
}
