import React from 'react'
import { sprintf } from 'sprintf-js'
import { useFetchList, useDelete } from '../../../../hooks'
import { branchListFetch, branchDeleteAction } from '../../actions/branch'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import BranchList from '../../components/Branch/BranchList'
import { DEFAULT_PICK_PARAMS } from '../../../../utils/isEquals'
import * as ROUTES from '../../../../constants/routes'

const PICK_PARAMS = [...DEFAULT_PICK_PARAMS, 'status', 'client']
const BranchListContainer = props => {
  const data = useFetchList({
    action: branchListFetch,
    stateName: stateNames.BRANCH_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.BRANCH_DELETE,
    action: branchDeleteAction,
    successAction: branchListFetch
  })

  const onEdit = id =>
    props.history.push(sprintf(ROUTES.BRANCH_UPDATE_URL, id))
  return (
    <Layout>
      <BranchList data={data} onEdit={onEdit} deleteData={deleteData} />
    </Layout>
  )
}

export default BranchListContainer
