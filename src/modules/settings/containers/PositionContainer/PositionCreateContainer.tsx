import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { useCreate } from 'hooks'
import Layout from 'components/Layouts/Layout'
import PositionCreate from '../../components/Position/PositionCreate'
import {
  positionCreateAction
} from '../../actions/positionActions'

const PositionCreateContainer = () => {
  const data = useCreate({
    stateName: stateNames.POSITION_CREATE,
    action: positionCreateAction,
    redirectUrl: ROUTES.POSITION_LIST_PATH
  })

  return (
    <Layout>
      <PositionCreate
        {...data}
      />
    </Layout>
  )
}
export default PositionCreateContainer
