import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React, { useMemo, useRef } from 'react'
import { sprintf } from 'sprintf-js'
import { useFetchList, useFilterActions, useDelete } from 'hooks'
import { groupListFetch, groupDeleteAction } from '../../actions/groupActions'
import GroupList from '../../components/Group/GroupList'
import { fields } from '../../components/Group/GroupListFilterForm'

const GroupListContainer = props => {
  const data = useFetchList({
    action: groupListFetch,
    stateName: stateNames.GROUP_LIST
  })

  const deleteData = useDelete({
    stateName: stateNames.GROUP_DELETE,
    action: groupDeleteAction,
    successAction: groupListFetch
  })

  const filterAction = useFilterActions({ fields })

  const onEdit = id => props.history.push(sprintf(ROUTES.GROUP_UPDATE_URL, id))
  return (
    <GroupList
      data={data}
      filterAction={filterAction}
      onEdit={onEdit}
      deleteData={deleteData}
    />
  )
}

export default GroupListContainer
