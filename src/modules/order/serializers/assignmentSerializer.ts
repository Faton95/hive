import {fields} from "../components/Assignment/AssignmentCreate";
import {path} from 'ramda'
import {getSerializedData} from "utils/get";
import toSnake from "utils/toSnakeCase";
import {mapRates} from '../utils'
import dateFormat from '../../../utils/dateFormat'

const trimLodash = (value, key) => ({
  amount: value,
  position: key.replace('_', '')
})
export const createSerializer = data => {
  
  console.warn(data)
  const serialized = getSerializedData(fields, data)
  console.warn(serialized)
  const rates = mapRates(data)
  return toSnake({
    ...data,
    ...serialized,
    rates,
  })
}
