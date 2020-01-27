import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/ClientCreate'

export const createSerializer = data => {
  const fieldsData = getSerializedData(fields, data)
  console.warn('1', fieldsData)

  return {
    ...fieldsData
  }
}
