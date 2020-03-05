import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { History, Location } from 'history'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  useFetchItem,
  useDelete,
  useCreateModal,
  useFetchList
} from 'hooks'
import Layout from 'components/Layouts/Layout'
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
import {
  createExpenseSerializer,
  createFeeSerializer
} from '../../serializers/feeExpenseSerializer'

type Props = {
    history: History;
    location: Location;
}
const AssignmentDetailContainer = (props: Props) => {
  const dispatch = useDispatch()
  const params = useParams<{id: string}>()
  const assignment = params.id
  const data = useFetchItem({
    action: assignmentItemFetch,
    stateName: stateNames.ASSIGNMENT_ITEM
  })

  const deleteData = useDelete({
    stateName: stateNames.ASSIGNMENT_DELETE,
    action: assignmentDeleteAction,
    successAction: assignmentListFetch
  })

  const expenseData = useFetchList({
    action: expenseListFetch,
    stateName: stateNames.EXPENSE_LIST,
    mapper: () => ({ page_size: 100, assignment })

  })

  const feeData = useFetchList({
    action: feeListFetch,
    stateName: stateNames.FEE_LIST,
    mapper: () => ({ page_size: 100, assignment })
  })

  const onFeeCreate = useCreateModal({
    key: 'feeModal',
    stateName: stateNames.FEE_CREATE,
    action: feeCreateAction,
    onSuccess: () => dispatch(feeListFetch({})),
    serializer: (values) => createFeeSerializer(assignment, values)
  })

  const onExpenseCreate = useCreateModal({
    key: 'expenseModal',
    stateName: stateNames.EXPENSE_CREATE,
    action: expenseCreateAction,
    onSuccess: () => dispatch(expenseListFetch({})),
    serializer: (values) => createExpenseSerializer(assignment, values)
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
