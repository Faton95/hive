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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts/es6'

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
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
  ]
  return (
    <div>
      <Menu title='Invoice' module={MENU_KEYS.BILLING} active={MENU_KEYS.BILLING} />
      <Box>
        <BarChart
          barGap={-40}

          width={600} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='pv' fill='#82ca9d94' />
          <Bar dataKey='uv' fill='#82ca9d' />
        </BarChart>
      </Box>
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
