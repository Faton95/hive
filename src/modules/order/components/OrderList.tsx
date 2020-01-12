import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Menu } from '../../../components/Menu'
import Pagination from '../../../components/Pagination'
import { MENU_KEYS } from '../../../constants/menus'
import { TGetDataFromState, TData } from '../../../types'
import { TUseDelete } from '../../../types/hooks'
import { TOrderItem, TOrderList } from '../../../types/models'
import numberFormat from '../../../utils/numberFormat'
import dateFormat from '../../../utils/dateFormat'
import { ORDER_ITEM_URL, ORDER_CREATE_PATH } from '../../../constants/routes'
import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
  TableHeader,
  TableCol,
  TableBody
} from '../../../components/Table'
import { Box, Dropdown, DropdownItem } from '../../../components/UI'
import Loader from '../../../icons/Loader'
import OrderListFilterForm from './OrderListFilterForm'

type Props = {
    data: TGetDataFromState<TData<TOrderItem>>;
    filterAction: any;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0
const OrderList: FunctionComponent<Props> = props => {
  const { data, filterAction, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list: TOrderList = pathOr(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)

  const filterForm = (<OrderListFilterForm />)
  const actions = (
    <TableActions
      createPath={ORDER_CREATE_PATH}
      filterForm={filterForm}
      filterActions={filterAction}
    />
  )

  return (
    <div>
      <Menu title="Заказы" module={MENU_KEYS.ORDER} active={MENU_KEYS.ORDER} />
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
            {list.map((item: TOrderItem) => {
              const id = prop('id', item)
              const paymentType = prop('paymentType', item)
              const status = prop('status', item)
              const createdDate = dateFormat(item.createdDate)
              const link = sprintf(ORDER_ITEM_URL, id)
              const totalPrice = numberFormat(item.totalPrice, 'сум')
              const name = item.client.fullName || item.client.phoneNumber

              return (
                <TableRowLink link={link} key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={4}>{name}</TableCol>
                  <TableCol span={3}>{createdDate}</TableCol>
                  <TableCol span={4}>{paymentType}</TableCol>
                  <TableCol span={4}>{totalPrice}</TableCol>
                  <TableCol span={4}>{status}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => onEdit(id)}>
                        Изменить
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                        Удалить
                      </DropdownItem>
                    </Dropdown>
                  </TableCol>
                </TableRowLink>
              )
            })}
          </TableBody>
        </Table>
      </Box>
      <Pagination count={count} />
    </div>
  )
}

export default OrderList
