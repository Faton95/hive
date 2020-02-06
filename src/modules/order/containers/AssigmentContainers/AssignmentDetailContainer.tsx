import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import AssignmentDetail from '../../components/Assignment/AssignmentDetails/AssignmentDetail'
import {
  assignmentItemFetch,
  assignmentDeleteAction,
  assignmentListFetch,
  feeCreateAction,
} from '../../action/assignmentActions'
import { useFetchItem, useDelete, useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const AssignmentDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: assignmentItemFetch,
    stateName: stateNames.ASSIGNMENT_ITEM
  })
  const deleteData = useDelete({
    stateName: stateNames.ASSIGNMENT_DELETE,
    action: assignmentDeleteAction,
    successAction: assignmentListFetch
  })
  const onCreate = useCreate({
    stateName: stateNames.FEE_CREATE,
    action: feeCreateAction,
    redirectUrl: ROUTES.ASSIGNMENT_ITEM_PATH,
  })

  return (
    <Layout>
      <AssignmentDetail

      />
    </Layout>
  )
}
export default AssignmentDetailContainer
