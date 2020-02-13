import { path } from 'ramda'
import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/OutsourceCreate'

export const createSerializer = data => {
  const contacts = path(['contacts'], data)
  const fieldsData = getSerializedData(fields, data)
  return {
    ...fieldsData,
    contacts
  }
}
