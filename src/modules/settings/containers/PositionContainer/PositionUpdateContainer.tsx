import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { History, Location } from 'history'
import { map, pathOr, prop } from 'ramda'
import { useFetchItem, useFetchList, useUpdate } from 'hooks'
import Layout from 'components/Layouts/Layout'
import { TPositionItem, TGroupItem } from 'types'
import PositionUpdate from '../../components/Position/PositionUpdate'
import { groupListFetch } from '../../actions/groupActions'
import { positionUpdateAction, positionItemFetch } from '../../actions/positionActions'

type Props = {
  history: History;
  location: Location;
}
const OrderUpdateContainer = () => {
  const positionItem = useFetchItem({
    action: positionItemFetch,
    stateName: stateNames.POSITION_ITEM
  })

  const update = useUpdate({
    action: positionUpdateAction,
    stateName: stateNames.POSITION_UPDATE,
    redirectUrl: ROUTES.POSITION_LIST_PATH
  })

  const groups = useFetchList({
    action: groupListFetch,
    stateName: stateNames.GROUP_LIST
  })

  const data: TPositionItem = prop('data', positionItem)
  const positionGroups = pathOr<TGroupItem[]>([], ['data', 'groups'], positionItem)
  const initialGroups = map(prop('id'), positionGroups)

  const initialValues = {
    ...data,
    groups: initialGroups
  }

  return (
    <Layout>
      <PositionUpdate
        {...update}
        groups={groups}
        initialValues={initialValues}
      />
    </Layout>
  )
}

export default OrderUpdateContainer
