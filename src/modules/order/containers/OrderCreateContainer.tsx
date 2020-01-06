import React from 'react'
import OrderCreate from '../components/OrderCreate'
import { orderItemFetch } from '../action/actions'
import { useFetchItem } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'

const OrderDetailContainer = props => {

  return (
    <Layout>
      <OrderCreate
      />
    </Layout>
  )
}
export default OrderDetailContainer
