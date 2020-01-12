import React from 'react'
import OrderCreate from '../components/OrderCreate'
import { orderItemFetch , orderCreateAction } from '../action/actions'
import { createSerializer } from '../action/orderSerializer'
import { useFetchItem, useCreate } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import * as ROUTES from '../../../constants/routes'
import Layout from '../../../components/Layouts/Layout'

const OrderDetailContainer = props => {

  const data = useCreate({
    stateName: stateNames.ORDER_CREATE,
    action: orderCreateAction,
    redirectUrl: ROUTES.ORDER_LIST_PATH,
    serializer: createSerializer
  })
  return (
    <Layout>
      <OrderCreate
        {...data}
      />
    </Layout>
  )
}
export default OrderDetailContainer
