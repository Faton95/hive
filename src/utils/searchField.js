import { curry, find, path, pathOr, propEq } from 'ramda'
import toSnakeCase from './toSnakeCase'
import axios, { getPayloadFromSuccess } from './axios'

export const getOptions = (store, { api, search, params, pageSize = 5 }) => {
  const defaultParams = toSnakeCase({ pageSize, search, ...params })
  return axios(store)
    .get(api, { params: defaultParams })
    .then(pathOr([], ['data', 'results']))
}

export const getOption = (store, { api }) => id => {
  return axios(store)
    .get(`${api}${id}/`)
    .then(getPayloadFromSuccess)
}

export const getStaticOptions = (search, list) => Promise.resolve(list)

export const getStaticOption = (id, list) => Promise.resolve(find(propEq('id', id))(list))

export const defaultGetText = curry((text, obj) => path(text, obj))

export const defaultGetValue = curry((value, obj) => path(value, obj))
