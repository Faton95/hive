import { getSerializedData } from 'utils/get'
import toSnake from 'utils/toSnakeCase'
import { fields } from '../components/Assignment/AssignmentCreate'
import { mapRates } from '../utils'

export const createSerializer = data => {
  const serialized = getSerializedData(fields, data)
  const rates = mapRates(data)
  return toSnake({
    ...data,
    ...serialized,
    rates
  })
}
