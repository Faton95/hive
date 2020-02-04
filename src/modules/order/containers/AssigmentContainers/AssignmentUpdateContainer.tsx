import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import { prop } from 'ramda'
import AssignmentUpdate from '../../components/Assignment/AssignmentUpdate'
import { assignmentItemFetch, assignmentUpdateAction } from '../../action/assignmentActions'
// import { createSerializer } from '../../action/'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import { getIdForInitValues } from '../../../../utils/get'

type Props = {
    history: History;
    location: Location;
}
const AssignmentUpdateContainer = (props: Props) => {
  const params: {id?: string} = useParams()
  const id = prop('id', params)

  const assignmentItem = useFetchItem({
    action: assignmentItemFetch,
    stateName: stateNames.ASSIGNMENT_ITEM
  })

  const update = useUpdate({
    action: assignmentUpdateAction,
    stateName: stateNames.ASSIGNMENT_UPDATE,
    redirectUrl: sprintf(ROUTES.ASSIGNMENT_ITEM_URL, id),
    // serializer: createSerializer
  })

  const data = prop('data', assignmentItem)
  
  const initialValues = {
    ...data,
    
  }

  return (
    <Layout>
      <AssignmentUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default AssignmentUpdateContainer
