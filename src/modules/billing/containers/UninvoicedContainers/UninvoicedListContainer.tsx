import * as stateNames from 'constants/stateNames'
import React from 'react'
import { DEFAULT_PICK_PARAMS } from 'utils/isEquals'
import { usePromiseDispatch } from 'etc/reducers'

import {
  useFetchList,
  useDelete
} from 'hooks'
import {
  clientListFetch
} from 'modules/client/action/actions'

import {
  assignmentListFetch, feeListFetch, expenseListFetch
} from 'modules/order/action/assignmentActions'
import { TAssignmentItem, TClientItem, TData, TExpenseItem, TFeeItem } from 'types'
import {
  uninvoicedListFetch,
  uninvoicedDeleteAction,
} from '../../action/billing'

import UninvoicedList from '../../components/Uninvoiced/UninvoicedList'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'tags',
]
const PAGE_SIZE = 'page_size'
const UninvoicedListContainer = props => {
  const dispatch = usePromiseDispatch()

  const clientData = useFetchList<TData<TClientItem>>({
    action: clientListFetch,
    stateName: stateNames.CLIENT_LIST,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 200 })
  })

  const assigmentData = useFetchList<TData<TAssignmentItem>>({
    action: assignmentListFetch,
    stateName: stateNames.ASSIGNMENT_LIST,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 1000 })
  })

  const feeData = useFetchList<TData<TFeeItem>>({
    action: feeListFetch,
    stateName: stateNames.FEE_LIST,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 1000 })
  })
  const expenseData = useFetchList<TData<TExpenseItem>>({
    action: expenseListFetch,
    stateName: stateNames.EXPENSE_LIST,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 1000 })
  })

  const deleteData = useDelete({
    stateName: stateNames.UNINVOICED_LIST,
    action: uninvoicedDeleteAction,
    successAction: uninvoicedListFetch
  })

  return (
    <UninvoicedList
      clientData={clientData}
      assigmentData={assigmentData}
      feeData={feeData}
      expenseData={expenseData}
      deleteData={deleteData}
    />
  )
}

export default UninvoicedListContainer
