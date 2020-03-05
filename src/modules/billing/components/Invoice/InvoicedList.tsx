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
  TableColRight
} from 'components/Table'
import { Box, } from 'components/UI'

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

  console.warn(list)
  const ids = map(prop('id'), list)
  const actions = (
    <TableActions />
  )

  return (
    <div>
      <Menu title="Invoice" module={MENU_KEYS.BILLING} active={MENU_KEYS.BILLING} />
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
                <TableRow key={id} align="center">
                  <TableCol span={24}>
                    {id}
                  </TableCol>
                </TableRow>
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
