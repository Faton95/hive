import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { History, Location } from 'history'
import { map, pathOr, prop } from 'ramda'
import { useFetchItem, useFetchList, useUpdate } from 'hooks'
import Layout from 'components/Layouts/Layout'
import { TPositionItem, TGroupItem } from 'types'
import RoleUpdate from '../../components/Role/RoleUpdate'
import { groupListFetch } from '../../actions/groupActions'
import { roleUpdateAction, roleItemFetch } from '../../actions/roleActions'

type Props = {
  history: History;
  location: Location;
}
const OrderUpdateContainer = () => {
  const roleItem = useFetchItem({
    action: roleItemFetch,
    stateName: stateNames.ROLE_ITEM
  })

  const update = useUpdate({
    action: roleUpdateAction,
    stateName: stateNames.ROLE_UPDATE,
    redirectUrl: ROUTES.ROLE_LIST_PATH
  })

  const groups = useFetchList({
    action: groupListFetch,
    stateName: stateNames.GROUP_LIST,
    mapper: () => ({page_size: 200})
  })

  const data: TPositionItem = prop('data', roleItem)
  const roleGroups = pathOr<TGroupItem[]>([], ['data', 'groups'], roleItem)
  const initialGroups = map(prop('id'), roleGroups)

  const initialValues = {
    ...data,
    groups: initialGroups
  }

  return (
    <Layout>
      <RoleUpdate
        {...update}
        groups={groups}
        initialValues={initialValues}
      />
    </Layout>
  )
}

export default OrderUpdateContainer
