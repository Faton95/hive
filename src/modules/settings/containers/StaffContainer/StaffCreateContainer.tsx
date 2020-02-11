import React from 'react'
import StaffCreate from '../../components/StaffComponent/StaffCreate'
import { staffCreateAction } from '../../actions/staffActions'
import { useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import * as ROUTES from '../../../../constants/routes'
import Layout from '../../../../components/Layouts/Layout'
import {createSerializer} from '../../serializers/staffSerializer'

const StaffDetailContainer = props => {

  const data = useCreate({
    stateName: stateNames.STAFF_CREATE,
    action: staffCreateAction,
    redirectUrl: ROUTES.STAFF_LIST_PATH,
    serializer: createSerializer

  })
  return (
    <Layout>
      <StaffCreate {...data} />
    </Layout>
  )
}
export default StaffDetailContainer
