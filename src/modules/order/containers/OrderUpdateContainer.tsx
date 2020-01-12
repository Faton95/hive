import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import { prop } from 'ramda'
import OrderUpdate from '../components/OrderUpdate'
import { orderItemFetch, orderUpdateAction } from '../action/actions'
import { createSerializer } from '../action/orderSerializer'
import { useFetchItem, useUpdate } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import * as ROUTES from '../../../constants/routes'
import { getIdForInitValues } from '../../../utils/get'

type Props = {
    history: History;
    location: Location;
}
const OrderUpdateContainer = (props: Props) => {
  const params: {id?: string} = useParams()
  const id = prop('id', params)

  const orderItem = useFetchItem({
    action: orderItemFetch,
    stateName: stateNames.ORDER_ITEM
  })

  const update = useUpdate({
    action: orderUpdateAction,
    stateName: stateNames.ORDER_UPDATE,
    redirectUrl: sprintf(ROUTES.ORDER_ITEM_URL, id),
    serializer: createSerializer
  })

  const data = prop('data', orderItem)
  const initialValues = {
    ...data,
    ...getIdForInitValues(data, ['paymentType'])
  }

  return (
    <Layout>
      <OrderUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default OrderUpdateContainer
