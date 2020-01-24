import React from 'react'
import PositionCreate from '../../components/Position/PositionCreate'
import {
  positionCreateAction
} from '../../actions/positionActions'

import {
  groupListFetch
} from '../../actions/groupActions'

import {useCreate, useFetchList} from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import Layout from 'components/Layouts/Layout'

const PositionCreateContainer = props => {

  const data = useCreate({
    stateName: stateNames.POSITION_CREATE,
    action: positionCreateAction,
    redirectUrl: ROUTES.POSITION_LIST_PATH
  })

  const groups = useFetchList({
    action: groupListFetch,
    stateName: stateNames.GROUP_LIST
  })

  return (
    <Layout>
      <PositionCreate
        {...data}
        groups={groups}
      />
    </Layout>
  )
}
export default PositionCreateContainer
