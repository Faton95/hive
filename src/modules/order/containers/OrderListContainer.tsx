import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useFilterActions,
  useDelete
} from '../../../hooks'
import { orderListFetch, orderDeleteAction } from '../action/actions'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import OrderList from '../components/OrderList'
import { fields } from '../components/OrderListFilterForm'
import { DEFAULT_PICK_PARAMS } from '../../../utils/isEquals'
import * as ROUTES from '../../../constants/routes'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'status',
  'client'
]
const OrderListContainer = props => {
  const data = useFetchList({
    action: orderListFetch,
    stateName: stateNames.ORDER_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.ORDER_DELETE,
    action: orderDeleteAction,
    successAction: orderListFetch
  })

  const filterAction = useFilterActions({ fields })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.ORDER_UPDATE_URL, id))
  return (
    <Layout>
      <OrderList
        data={data}
        filterAction={filterAction}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default OrderListContainer
