import axios from 'axios'
import { path, equals, curry, prop, compose, isNil } from 'ramda'
import * as actionTypes from '../constants/actionTypes'
import { API_URL } from '../constants/api'
import responseToCamelCase from './responseToCamelCase'
import expireDocumentCookie from './expireDocumentCookie'
import { getCookie } from './cookie'

const UNAUTHORIZED = 401

export const getPayloadFromSuccess = response => {
  return prop('data', response)
}

export const getPayloadFromError = compose(
  data => !isNil(data) && Promise.reject(data),
  path(['response', 'data'])
)
const errorInterceptors = curry((dispatch, error) => {
  const status = path(['response', 'status'], error)

  if (equals(UNAUTHORIZED, status && history && dispatch)) {
    console.warn('AXIOS ERROR CLEAR')
    dispatch({ type: `${actionTypes.LOGIN}_CLEAR` })
    dispatch({ type: `${actionTypes.USER_INFO}_CLEAR` })
    expireDocumentCookie()
  }
  return Promise.reject(error)
})

const axiosRequest = ({ getState, dispatch }, noAuth = false) => {
  const state = getState && getState()
  const token = path(['login', 'data', 'token'], state) || getCookie('token')

  axios.defaults.baseURL = `${API_URL}`
  axios.defaults.transformResponse = [responseToCamelCase]
  axios.defaults.timeout = 100000

  if (!noAuth) {
    axios.defaults.headers.common.Authorization = token ? `Token ${token}` : ''
  } else {
    axios.defaults.headers.common = {}
  }

  axios.interceptors.response.use(
    response => response,
    errorInterceptors(dispatch)
  )

  return axios
}

export default axiosRequest
