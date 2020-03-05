
import { getSerializedData } from 'utils/get'
import toSnakeCase from 'utils/toSnakeCase'

import { fields } from '../components/Assignment/AssignmentCreate'

export const createSerializer = (assigment, data) => {
  const fieldsData = getSerializedData(fields, data)
  return toSnakeCase({
    ...data,
    ...fieldsData,
    assigment
  })
}
