import {fields} from "../components/Contract/ContractCreate";
import {getSerializedData} from "utils/get"
import toSnake from "utils/toSnakeCase"
import {mapRates} from '../utils'

export const createSerializer = data => {
  console.warn('do', data)
  const serialized = getSerializedData(fields, data)
  console.warn('posle', serialized)
  const rates = mapRates(data)
  return toSnake({
    ...data,
    ...serialized,
    rates
  })
}
