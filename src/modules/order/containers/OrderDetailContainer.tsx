import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import OrderDetail from '../components/OrderDetail'
import { orderItemFetch } from '../action/actions'
import { useFetchItem } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import * as ROUTES from '../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const OrderDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: orderItemFetch,
    stateName: stateNames.ORDER_ITEM
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.ORDER_UPDATE_URL, id))

  return (
    <Layout>
      <OrderDetail
        item={data}
        onDelete={() => null}
        onEdit={onEdit}
      />
    </Layout>
  )
}
export default OrderDetailContainer
