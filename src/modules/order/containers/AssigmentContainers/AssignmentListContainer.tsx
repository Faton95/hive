import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useFilterActions,
  useDelete
} from '../../../../hooks'
import { assignmentListFetch, assignmentDeleteAction } from '../../action/assignmentActions'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import AssignmentList from '../../components/Assignment/AssignmentList'
import { fields } from '../../components/Assignment/AssignmentListFilterForm'
import { DEFAULT_PICK_PARAMS } from '../../../../utils/isEquals'
import * as ROUTES from '../../../../constants/routes'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'contract',
  'client',
  'branch',
  'teamLeader',
  'isBillable'
]
const AssignmentListContainer = props => {
  const data = useFetchList({
    action: assignmentListFetch,
    stateName: stateNames.ASSIGNMENT_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.ASSIGNMENT_DELETE,
    action: assignmentDeleteAction,
    successAction: assignmentListFetch
  })

  const filterAction = useFilterActions({ fields })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.ASSIGNMENT_UPDATE_URL, id))
  return (
    <Layout>
      <AssignmentList
        data={data}
        filterAction={filterAction}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default AssignmentListContainer
