import React from 'react'
import { prop, path, map, pathOr } from 'ramda'
import GroupUpdate from '../../components/Group/GroupUpdate'
import { groupItemFetch, groupUpdateAction, permissionListFetch } from '../../actions/groupActions'
import { useFetchItem, useUpdate, useFetchList } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import {createSerializer} from '../../serializers/groupSerializer'
import {TData, TIdName} from 'types'

const GroupUpdateContainer = () => {
  const groupItem = useFetchItem({
    action: groupItemFetch,
    stateName: stateNames.GROUP_ITEM
  })

  const update = useUpdate({
    action: groupUpdateAction,
    stateName: stateNames.GROUP_UPDATE,
    redirectUrl: ROUTES.GROUP_LIST_PATH,
    serializer: createSerializer
  })
  
  const permissionData = useFetchList<TData<TIdName>>({
    stateName: stateNames.PERMISSION_LIST,
    action: permissionListFetch
  })

  const data = prop('data', groupItem)
  const name = path(['name'], data)
  const perm = pathOr([], ['permissions'], data)
  const permissions = map(prop('id'), perm)

  const initialValues = {
    ...data,
    name,
    permissions
  }

  return (
    <Layout>
      <GroupUpdate 
        {...update} 
        initialValues={initialValues} 
        permissionData={permissionData}
      />
    </Layout>
  )
}

export default GroupUpdateContainer
