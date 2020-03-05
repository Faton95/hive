import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import React from 'react'
import { prop } from 'ramda'
import { useFetchItem, useUpdate } from 'hooks'
import Layout from 'components/Layouts/Layout'
import { TPositionItem } from 'types'
import PositionUpdate from '../../components/Position/PositionUpdate'
import { positionUpdateAction, positionItemFetch } from '../../actions/positionActions'

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


  const data: TPositionItem = prop('data', positionItem)

  const initialValues = {
    ...data
  }

  return (
    <Layout>
      <PositionUpdate
        {...update}
        initialValues={data}
      />
    </Layout>
  )
}

export default OrderUpdateContainer
