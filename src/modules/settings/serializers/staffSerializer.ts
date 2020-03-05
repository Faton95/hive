import { getSerializedData } from 'utils/get'
import toSnakeCase from 'utils/toSnakeCase'
import { fields } from '../components/StaffComponent/StaffCreate'

export const createSerializer = data => {
  const fieldsData = getSerializedData(fields, data)

  return toSnakeCase(fieldsData)
}
