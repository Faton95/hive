import React from 'react'
import RoleCreate from '../../components/Role/RoleCreate'
import { roleCreateAction } from '../../actions/roleActions'
import { groupListFetch } from '../../actions/groupActions'

import {useCreate, useFetchList} from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import Layout from 'components/Layouts/Layout'

const RoleCreateContainer = props => {

  const data = useCreate({
    stateName: stateNames.ROLE_CREATE,
    action: roleCreateAction,
    redirectUrl: ROUTES.ROLE_LIST_PATH
  })

  const groups = useFetchList({
    action: groupListFetch,
    stateName: stateNames.GROUP_LIST,
    mapper: () => ({page_size: 200})
  })

  return (
    <Layout>
      <RoleCreate
        {...data}
        groups={groups}
      />
    </Layout>
  )
}
export default RoleCreateContainer
