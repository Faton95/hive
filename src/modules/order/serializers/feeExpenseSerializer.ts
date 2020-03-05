import { map, path, pipe, prop } from 'ramda'
import { getSerializedData } from 'utils/get'
import toSnakeCase from 'utils/toSnakeCase'

import { fields } from '../components/Assignment/AssignmentDetails/AssignmentFeeExpensesCreate'

export const createExpenseSerializer = (assignment, data) => {
  const fieldsData = getSerializedData(fields, data)
  const cashier = path(['cashier', 'id'], data)

  return toSnakeCase({
    ...fieldsData,
    assignment,
    cashier
  })
}

type FeeItem = {
    description: string;
    date: string;
    spentTime: string;
}
export const createFeeSerializer = (assignment, data) => {
  const feeList: FeeItem[] = prop('fees', data)
  const fees = map((fee: FeeItem) => {
    const spentTime = fee.spentTime.length === 5 ? fee.spentTime + ':00' : undefined
    return {
      ...fee,
      spent_time: spentTime,
    }
  }, feeList)

  return toSnakeCase({
    fees,
    assignment
  })
}
