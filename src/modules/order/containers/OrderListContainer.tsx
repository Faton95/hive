import React from 'react'
import { useFetchList } from '../../../hooks'
import { orderListFetch } from '../action/actions'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import OrderList from '../components/OrderList'
const OrderListContainer = props => {
  const data = useFetchList({
    action: orderListFetch,
    stateName: stateNames.ORDER_LIST
  })


  return <Layout>
    <OrderList data={data} />
  </Layout>
}

export default OrderListContainer
