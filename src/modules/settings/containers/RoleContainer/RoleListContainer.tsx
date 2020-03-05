import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { sprintf } from 'sprintf-js'
import { useFetchList, useDelete } from 'hooks'
import Layout from 'components/Layouts/Layout'
import { roleListFetch, roleDeleteAction } from '../../actions/roleActions'
import RoleList from '../../components/Role/RoleList'

const RoleListContainer = props => {
  const data = useFetchList({
    action: roleListFetch,
    stateName: stateNames.ROLE_LIST
  })

  const deleteData = useDelete({
    stateName: stateNames.ROLE_DELETE,
    action: roleDeleteAction,
    successAction: roleListFetch
  })

  const onEdit = id => props.history.push(sprintf(ROUTES.ROLE_UPDATE_URL, id))
  return (
    <Layout>
      <RoleList
        data={data}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default RoleListContainer
