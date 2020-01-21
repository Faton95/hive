import React from 'react'
import BranchCreate from '../../components/Branch/BranchCreate'
import { branchCreateAction } from '../../actions/branch'
import { createSerializer } from '../../serializers/branchSerializer'
import { useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import * as ROUTES from '../../../../constants/routes'
import Layout from '../../../../components/Layouts/Layout'

const BranchDetailContainer = props => {
  const data = useCreate({
    stateName: stateNames.BRANCH_CREATE,
    action: branchCreateAction,
    redirectUrl: ROUTES.BRANCH_LIST_PATH,
    serializer: createSerializer
  })
  return (
    <Layout>
      <BranchCreate {...data} />
    </Layout>
  )
}
export default BranchDetailContainer
