import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import { useCreate, useFetchList } from 'hooks'
import React from 'react'
import Layout from 'components/Layouts/Layout'
import { positionListFetch } from 'modules/settings/actions/positionActions'
import { TData, TPositionItem } from 'types'
import {
  assignmentCreateAction
} from '../../action/assignmentActions'
import AssignmentCreate from '../../components/Assignment/AssignmentCreate'
import { createSerializer } from '../../serializers/assignmentSerializer'

const AssignmentCreateContainer = props => {
  const data = useCreate({
    stateName: stateNames.ASSIGNMENT_CREATE,
    action: assignmentCreateAction,
    redirectUrl: ROUTES.ASSIGNMENT_LIST_PATH,
    serializer: createSerializer
  })

  const positionData = useFetchList<TData<TPositionItem>>({
    stateName: stateNames.POSITION_LIST,
    action: positionListFetch
  })

  return (
    <Layout>
      <AssignmentCreate
        {...data}
        positionData={positionData}
      />
    </Layout>
  )
}
export default AssignmentCreateContainer
