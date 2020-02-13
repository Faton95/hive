import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import AssignmentDetail from '../../components/Assignment/AssignmentDetails/AssignmentDetail'
import {
  assignmentItemFetch,
  assignmentDeleteAction,
  assignmentListFetch,
  feeCreateAction,
  feeListFetch,
  expenseCreateAction,
  expenseListFetch
} from '../../action/assignmentActions'
import { useFetchItem, useDelete, useCreate, useFetchList } from '../../../../hooks'
import { createSerializer } from '../../action/assignmentSerializer'
import { createExpenseSerializer } from '../../serializers/expenseSerializer'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const AssignmentDetailContainer = (props: Props) => {
  const params = useParams<{id: string}>()
  const data = useFetchItem({
    action: assignmentItemFetch,
    stateName: stateNames.ASSIGNMENT_ITEM
  })

  const deleteData = useDelete({
    stateName: stateNames.ASSIGNMENT_DELETE,
    action: assignmentDeleteAction,
    successAction: assignmentListFetch
  })

  const onFeeCreate = useCreate({
    stateName: stateNames.FEE_CREATE,
    action: feeCreateAction,
    redirectUrl: ROUTES.ASSIGNMENT_ITEM_URL,
    serializer: (values) => createSerializer(params.id, values)
  })

  const feeData = useFetchList({
    action: feeListFetch,
    stateName: stateNames.FEE_LIST,
  })

  const onExpenseCreate = useCreate({
    stateName: stateNames.EXPENSE_CREATE,
    action: expenseCreateAction,
    redirectUrl: ROUTES.ASSIGNMENT_ITEM_URL,
    serializer: (values) => createExpenseSerializer(params.id, values)
  })

  const expenseData = useFetchList({
    action: expenseListFetch,
    stateName: stateNames.EXPENSE_LIST,
  })

  return (
    <Layout>
      <AssignmentDetail
        data={data}
        deleteData={deleteData}
        onFeeCreate={onFeeCreate}
        feeData={feeData}
        onExpenseCreate={onExpenseCreate}
        expenseData={expenseData}
      />
    </Layout>
  )
}
export default AssignmentDetailContainer
