import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/Currency/CurrencyCreate'

export const createSerializer = data => {
  const fieldsData = getSerializedData(fields, data)
  return {
    ...fieldsData,
  }
}
