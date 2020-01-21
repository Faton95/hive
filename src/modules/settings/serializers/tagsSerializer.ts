import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/Tags/TagsCreate'

export const createSerializer = data => {
  const fieldsData = getSerializedData(fields, data)
  return {
    ...fieldsData,
  }
}
