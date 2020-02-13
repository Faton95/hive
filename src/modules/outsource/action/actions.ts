import { sprintf } from 'sprintf-js'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../../utils/axios'
import * as API from '../../../constants/api'
import * as actionTypes from '../../../constants/actionTypes'

export const outsourceListFetch = (data) => {

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API.OUTSOURCE_LIST, { params: data })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.OUTSOURCE_LIST
    })
  }
}
export const outsourceCreateAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.OUTSOURCE_CREATE, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.OUTSOURCE_CREATE
    })
  }
}

export const outsourceUpdateAction = (id, data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(sprintf(API.OUTSOURCE_UPDATE, id), data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.OUTSOURCE_UPDATE
    })
  }
}
export const outsourceItemFetch = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(sprintf(API.OUTSOURCE_ITEM, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.OUTSOURCE_ITEM
    })
  }
}

export const outsourceDeleteAction = (id) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(sprintf(API.OUTSOURCE_DELETE, id))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.OUTSOURCE_DELETE
    })
  }
}
