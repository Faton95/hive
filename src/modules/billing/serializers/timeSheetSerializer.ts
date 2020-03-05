import { getSerializedData } from 'utils/get'
import { fields } from '../components/TimeSheetCreateModal'

export const createSerializer = data => {
  const selectedField = getSerializedData(fields, data)
  return {
    ...data,
    ...selectedField
  }
}
export const updateSerializer = data => {
  const selectedField = getSerializedData(fields, data)

  return [data.id, selectedField]
}
export const startStopSerializer = id => id
