import { MENU_KEYS } from 'constants/menus'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { TGetDataFromState, TData } from 'types'
import { Menu } from 'components/Menu'
import Pagination from 'components/Pagination'
import {
  Table,
  TableActions,
  TableRow,
  TableHeader,
  TableCol,
  TableBody,
  TableColRight,
  TableRowLink
} from 'components/Table'
import { Box } from 'components/UI'
import dateFormat from 'utils/dateFormat'
import numberFormat from 'utils/numberFormat'
import { sprintf } from 'sprintf-js'
import { INVOICE_ITEM_URL } from 'constants/routes'

type Props = {
  invoiceData: TGetDataFromState<TData<any>>;

}
const EMPTY = []
const ZERO = 0

const InvoicedList: FunctionComponent<Props> = props => {
  const {
    invoiceData
  } = props

  const count = pathOr(ZERO, ['data', 'count'], invoiceData)
  const list = pathOr<any[]>(EMPTY, ['data', 'results'], invoiceData)

  const ids = map(prop('id'), list)
  const actions = (
    <TableActions />
  )

  return (
    <div>
      <Menu title='Invoice' module={MENU_KEYS.BILLING} active={MENU_KEYS.BILLING} />
      <Box>

        <Table loading={invoiceData.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={3}>ID</TableCol>
              <TableCol span={8}>Client</TableCol>
              <TableCol span={4}>Issue Date</TableCol>
              <TableCol span={3}>Paid</TableCol>
              <TableCol span={3}>Balance</TableCol>
              <TableColRight span={3}>Status</TableColRight>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => {
              const id = prop('id', item)
              return (
                <TableRowLink link={sprintf(INVOICE_ITEM_URL, id)} key={id} align='center'>
                  <TableCol span={3}>{id}</TableCol>
                  <TableCol span={8}>{item.client.name}</TableCol>
                  <TableCol span={4}>{dateFormat(item.issueDate)}</TableCol>
                  <TableCol span={3}>{numberFormat(item.balance)}</TableCol>
                  <TableCol span={3}>{numberFormat(item.balance)}</TableCol>
                  <TableColRight span={3}>{item.statusPayment}</TableColRight>
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

export default InvoicedList
