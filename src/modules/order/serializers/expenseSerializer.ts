
import { path, pipe, prop, map, propOr } from 'ramda'

import { getSerializedData, getParamFromHistory } from 'utils/get'
import toSnakeCase from 'utils/toSnakeCase'

import { fields } from '../components/Assignment/AssignmentDetails/AssignmentFeeExpensesCreate'

export const createExpenseSerializer = (assigment, data) => {

    const fieldsData = getSerializedData(fields, data)
    return toSnakeCase({
        ...fieldsData,
        assigment,
    })
}
