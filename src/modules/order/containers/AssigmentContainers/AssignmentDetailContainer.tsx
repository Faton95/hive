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
import { sprintf } from 'sprintf-js'

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

  const feeParams = { page_size: 100, assignment }
  const expenseData = useFetchList({
    action: expenseListFetch,
    stateName: stateNames.EXPENSE_LIST,
    mapper: () => (feeParams)

  })

  const feeData = useFetchList({
    action: feeListFetch,
    stateName: stateNames.FEE_LIST,
    mapper: () => (feeParams)
  })

  const onFeeCreate = useCreateModal({
    key: 'feeModal',
    stateName: stateNames.FEE_CREATE,
    action: feeCreateAction,
    onSuccess: () => dispatch(feeListFetch(feeParams)),
    serializer: (values) => createFeeSerializer(assignment, values)
  })

  const onExpenseCreate = useCreateModal({
    key: 'expenseModal',
    stateName: stateNames.EXPENSE_CREATE,
    action: expenseCreateAction,
    onSuccess: () => dispatch(expenseListFetch(feeParams)),
    serializer: (values) => createExpenseSerializer(assignment, values)
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.ASSIGNMENT_UPDATE_URL, id))
  return (

    <AssignmentDetail
      data={data}
      deleteData={deleteData}
      onFeeCreate={onFeeCreate}
      feeData={feeData}
      onExpenseCreate={onExpenseCreate}
      expenseData={expenseData}
      onEdit={onEdit}
    />
  )
}
export default AssignmentDetailContainer
