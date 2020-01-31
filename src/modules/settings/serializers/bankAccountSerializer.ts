import {path, pathOr, prop, map} from 'ramda'
import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/BankAccountComponent/BankAccountCreate'
import  toCamelCase  from 'utils/toCamelCase'


export const createSerializer = data => {
  const fieldsData = getSerializedData(fields, data)
  const bank_details = toCamelCase(prop('bankDetails', data))
  return {
    ...fieldsData,
    bank_details
  }
}
