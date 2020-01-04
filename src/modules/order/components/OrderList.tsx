import React, { FunctionComponent } from 'react'
import { prop, map } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Menu } from '../../../components/Menu'
import { MENU_KEYS } from '../../../constants/menus'
import { TGetDataFromState } from '../../../types'
import numberFormat from '../../../utils/numberFormat'
import dateFormat from '../../../utils/dateFormat'
import { ORDER_ITEM_URL } from '../../../constants/routes'

import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
  TableHeader,
  TableCol,
  TableBody
} from '../../../components/Table'
import { Box } from '../../../components/UI'

type Props = {
    data: TGetDataFromState;
}
type OrderItem = {
    id: number;
    orderProducts: Array<object>;
    createdDate: string;
    address: object;
    totalPrice: string;
    status: string;
    dealType: string;
    paymentType: string;
    balance: string;
    client: {id: number; fullName: string; phone: string};
}
const OrderList: FunctionComponent<Props> = props => {
  const { data } = props
  const ids = map(prop('id'), data.results)
  const actions = (
    <TableActions
      createPath={'create/'}
    />
  )

  return (
    <div>
      <Menu title="Закази" module={MENU_KEYS.ORDER} active={MENU_KEYS.ORDER} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={4}>Клиент</TableCol>
              <TableCol span={3}>Дата создания</TableCol>
              <TableCol span={4}>Тип оплати</TableCol>
              <TableCol span={4}>Сумма</TableCol>
              <TableCol span={4}>Статус</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((item: OrderItem) => {
              const id = prop('id', item)
              const paymentType = prop('paymentType', item)
              const status = prop('status', item)
              const createdDate = dateFormat(item.createdDate)
              const link = sprintf(ORDER_ITEM_URL, id)
              const totalPrice = numberFormat(item.totalPrice, 'сум')
              const name = item.client.fullName || item.client.phone

              return (
                <TableRowLink link={link} key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={4}>{name}</TableCol>
                  <TableCol span={3}>{createdDate}</TableCol>
                  <TableCol span={4}>{paymentType}</TableCol>
                  <TableCol span={4}>{totalPrice}</TableCol>
                  <TableCol span={4}>{status}</TableCol>
                  <TableCol span={1}>
                                    Drop
                  </TableCol>
                </TableRowLink>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </div>
  )
}

export default OrderList
