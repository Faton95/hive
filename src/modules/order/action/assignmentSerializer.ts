
import { path, pipe, prop, map, propOr } from 'ramda'

import { getSerializedData, getParamFromHistory } from 'utils/get'
import toSnakeCase from 'utils/toSnakeCase'

import { fields } from '../components/Assignment/AssignmentCreate'

export const createSerializer = (assigment, data) => {
  console.warn(data)
  const fees = path(['fees'], data)
  const fieldsData = getSerializedData(fields, data)
  return toSnakeCase({
    ...fieldsData,
    assigment,
    fees
  })
}
