import React from 'react'
import GroupCreate from '../../components/Group/GroupCreate'
import {
  groupCreateAction,
  permissionListFetch
} from '../../actions/groupActions'
import { useFetchList, useCreate } from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import { TData, TIdName } from 'types'

const GroupCreateContainer = props => {
  const data = useCreate({
    stateName: stateNames.GROUP_CREATE,
    action: groupCreateAction,
    redirectUrl: ROUTES.GROUP_LIST_PATH
  })

  const permissionData = useFetchList<TData<TIdName>>({
    stateName: stateNames.PERMISSION_LIST,
    action: permissionListFetch
  })

  return (
    <GroupCreate
      {...data}
      permissionData={permissionData}
    />
  )
}
export default GroupCreateContainer
