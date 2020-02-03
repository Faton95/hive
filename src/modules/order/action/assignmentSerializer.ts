import { path, pipe, prop, map, propOr } from 'ramda'
import { getSerializedData } from 'utils/get'
import { fields } from '../components/Assignment/AssignmentCreate'
import toSnakeCase from 'utils/toSnakeCase'
import dateFormat from '../../../utils/dateFormat'

export const createSerializer = data => {
  console.warn(data)
  // const createdDate = dateFormat(path(['createdDate'], data))

  const fieldsData = getSerializedData(fields, data)

  return toSnakeCase({
    ...fieldsData,
    // createdDate
  })
}
