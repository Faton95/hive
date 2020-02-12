import React from 'react'
import { path } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import StaffCreate from '../../components/StaffComponent/StaffCreate'
import { staffCreateAction, staffPartiallyUpdateAction } from '../../actions/staffActions'
import { useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import * as ROUTES from '../../../../constants/routes'
import Layout from '../../../../components/Layouts/Layout'
import { createSerializer } from '../../serializers/staffSerializer'

const StaffDetailContainer = props => {
  const dispatch = useDispatch()

  const data = useCreate({
    stateName: stateNames.STAFF_CREATE,
    action: staffCreateAction,
    redirectUrl: ROUTES.STAFF_LIST_PATH,
    serializer: createSerializer
  })

  const onPicUpdate = value => {
    const photo = path(['id'], value)
    return dispatch(staffPartiallyUpdateAction(1, { photo }))
  }
  return (
    <Layout>
      <StaffCreate
        {...data}
        onPicUpdate={onPicUpdate}
      />
    </Layout>
  )
}
export default StaffDetailContainer
