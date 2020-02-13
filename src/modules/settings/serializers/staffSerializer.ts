import {path, pathOr, prop, map} from 'ramda'
import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/StaffComponent/StaffCreate'
import  toCamelCase  from 'utils/toCamelCase'

const EMPTY = []
export const createSerializer = data => {
  console.warn('staff', data)
  const fieldsData = getSerializedData(fields, data)
  return {
    ...fieldsData
  }
}
