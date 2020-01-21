import { getSerializedData } from '../../../utils/get'
import { fields } from '../components/Branch/BranchCreate'

export const createSerializer = data => {
  const fieldsData = getSerializedData(fields, data)
  return {
    ...fieldsData,
  }
}
