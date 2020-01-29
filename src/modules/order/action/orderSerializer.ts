import { path, pipe, prop, map, propOr } from 'ramda'
import { getSerializedData } from 'utils/get'
import { fields } from '../components/OrderCreate'
import toSnakeCase from 'utils/toSnakeCase'

const mapProducts = item => getSerializedData(['product', 'amount'], item)

export const createSerializer = data => {
  const orderProducts = pipe(
    propOr([], 'orderProducts'),
    map(mapProducts)
  )(data)

  const address = pipe(
    prop('address'),
    toSnakeCase
  )(data)

  const fieldsData = getSerializedData(fields, data)

  const client = path(['client'], fieldsData)

  return toSnakeCase({
    ...fieldsData,
    orderProducts,
    address: { ...address, client }
  })
}
