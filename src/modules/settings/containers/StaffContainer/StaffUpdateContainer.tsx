import React from 'react'
import { prop, path } from 'ramda'
import StaffUpdate from '../../components/StaffComponent/StaffUpdate'
import { staffItemFetch, staffUpdateAction } from '../../actions/staffActions'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'

const StaffUpdateContainer = () => {
  const staffItem = useFetchItem({
    action: staffItemFetch,
    stateName: stateNames.STAFF_ITEM
  })

  const update = useUpdate({
    action: staffUpdateAction,
    stateName: stateNames.STAFF_UPDATE,
    redirectUrl: ROUTES.STAFF_LIST_PATH,
  })

  const data = prop('data', staffItem)
  const position = path(['position', 'id'], data)
  const initialValues = {
    ...data,
    position
  }

  return (
    <Layout>
      <StaffUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default StaffUpdateContainer
