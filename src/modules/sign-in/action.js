import { prop } from 'ramda'
import * as actionTypes from '../../constants/actionTypes'
import * as API from '../../constants/api'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../utils/axios'
import { setCookie } from '../../utils/cookie'

export const loginAction = data => {

  const remember = prop('remember', data)
  const params = {
    username: prop('username', data),
    password: prop('password', data)
  }
  const ONE_DAY = 1
  const ONE_YEAR = 365

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API.LOGIN, params)
      .then(response => {
        const resp = prop('data', response)
        const token = prop('token', resp)
        setCookie('token', token, remember ? ONE_YEAR : ONE_DAY)
        return resp
      })
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.LOGIN
    })
  }
}

export const logoutAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(API.LOGOUT)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    setCookie('token', '')
    dispatch({ type: `${actionTypes.USER_INFO}_CLEAR` })
    dispatch({ type: `${actionTypes.LOGIN}_CLEAR` })
    return dispatch({
      payload,
      type: `${actionTypes.LOGIN}`
    })
  }
}

export const userInfoFetch = token => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(`${API.CHECK_TOKEN}${token}/`)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      payload,
      type: actionTypes.USER_INFO
    })
  }
}
