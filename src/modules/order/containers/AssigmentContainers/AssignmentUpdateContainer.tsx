import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import {map, path, pipe, prop, propOr} from 'ramda'
import Layout from 'components/Layouts/Layout'
import { TData, TPositionItem } from 'types'
import { positionListFetch } from 'modules/settings/actions/positionActions'
import AssignmentUpdate from '../../components/Assignment/AssignmentUpdate'
import { assignmentItemFetch, assignmentUpdateAction } from '../../action/assignmentActions'
import { createSerializer } from '../../serializers/assignmentSerializer'
import { useFetchItem, useFetchList, useUpdate } from '../../../../hooks'

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
    serializer: createSerializer
  })

  const positionData = useFetchList<TData<TPositionItem>>({
    stateName: stateNames.POSITION_LIST,
    action: positionListFetch
  })

  const data = prop('data', assignmentItem)

  const workGroup = pipe(
    propOr([], 'workGroup'),
    map((user: object) => ({ ...user, name: path(['fullName'], user) }))
  )(data)

  const initialValues = {
    ...data,
    workGroup
  }

  return (
    <Layout>
      <AssignmentUpdate
        {...update}
        initialValues={initialValues}
        positionData={positionData}
      />
    </Layout>
  )
}

export default AssignmentUpdateContainer
