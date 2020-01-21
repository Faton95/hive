import React from 'react'
import { prop } from 'ramda'
import BranchUpdate from '../../components/Branch/BranchUpdate'
import { branchItemFetch, branchUpdateAction } from '../../actions/branch'
import { createSerializer } from '../../serializers/branchSerializer'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import { getIdForInitValues } from '../../../../utils/get'

const BranchUpdateContainer = () => {
  const branchItem = useFetchItem({
    action: branchItemFetch,
    stateName: stateNames.BRANCH_ITEM
  })

  const update = useUpdate({
    action: branchUpdateAction,
    stateName: stateNames.BRANCH_UPDATE,
    redirectUrl: ROUTES.BRANCH_LIST_PATH,
    serializer: createSerializer
  })

  const data = prop('data', branchItem)
  const initialValues = {
    ...data,
    ...getIdForInitValues(data, ['paymentType'])
  }

  return (
    <Layout>
      <BranchUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default BranchUpdateContainer
