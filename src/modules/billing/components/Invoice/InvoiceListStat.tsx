import React, { FunctionComponent } from 'react'
import { Box, InputLabel } from 'components/UI'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Margin,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import styled from 'styled-components'
import { DisplayFlex } from 'components/StyledElems'
import pure from 'utils/pure'
import { TGetDataFromState, TMonthlyInvoiceAmount, TTotalInvoiceAmount } from 'types'
import { curry, find, pathOr, propOr } from 'ramda'
import { EMPTY_ARR, ZERO } from 'constants/usefulConstants'
import moment from 'moment'

const BoxUI = styled(Box)`
  margin-bottom: 15px;
  padding: 20px 0;
`

const Total = styled.div`
  padding: 10px;
  margin: 20px 50px;
 
`

const Value = styled.div`
  font-weight: 500;
  font-size: 45px;
`

const Chart = styled.div`
  width: calc(100% - 150px);
`

const margin: Margin = {
  top: 0,
  bottom: -40,
  right: 0,
  left: 0
}

type Props = {
  invoiceTotalData: TGetDataFromState<TTotalInvoiceAmount[]>;
  invoiceMonthData: TGetDataFromState<TMonthlyInvoiceAmount[]>
}

const monthEq = curry((month, item: TMonthlyInvoiceAmount) => {
  const name = moment(item.month, 'YYYY-MM-DD').format('MMM')
  console.warn(name, month)
  return name === month
})
const InvoiceListStat: FunctionComponent<Props> = props => {
  const { invoiceTotalData, invoiceMonthData } = props

  const totalOpenAmount = pathOr(ZERO, ['data', '0', 'totalAmount'], invoiceTotalData)
  const totalPaidAmount = pathOr(ZERO, ['data', '0', 'totalPaidAmount'], invoiceTotalData)
  const data = [
    { name: 'Jan', Open: 4000, Paid: 2400 },
    { name: 'Feb', Open: 3000, Paid: 1398 },
    { name: 'Mar', Open: 2000, Paid: 1000 },
    { name: 'Apr', Open: 2780, Paid: 2000 },
    { name: 'May', Open: 1890, Paid: 1500 },
    { name: 'June', Open: 2390, Paid: 2000 },
    { name: 'July', Open: 3490, Paid: 3000 },
    { name: 'Aug', Open: 3490, Paid: 3000 },
    { name: 'Sep', Open: 3490, Paid: 3000 },
    { name: 'Oct', Open: 3490, Paid: 3000 },
    { name: 'Nov', Open: 3490, Paid: 3000 },
    { name: 'Dec', Open: 3490, Paid: 3000 }
  ]

  const monthlyList = pathOr<TMonthlyInvoiceAmount[]>(EMPTY_ARR, ['data'], invoiceMonthData)
  const graphData = monthlyList.map(month => {
    const name = moment(month.month, 'YYYY-MM-DD').format('MMM')
    return { name, Paid: month.totalPaidPmount, Open: month.totalAmount }
  })

  const g = data.map(item => {
    const name = item.name

    const monthly = find(monthEq(item.name), monthlyList)
    const Open = propOr(ZERO, 'totalAmount', monthly)
    const Paid = propOr(ZERO, 'totalPaidAmount', monthly)
    return {
      name,
      Open,
      Paid
    }
  })


  return (
    <BoxUI>
      <DisplayFlex>
        <div>
          <Total>
            <InputLabel>Total Opened</InputLabel>
            <Value>{totalOpenAmount}</Value>
          </Total>
          <Total>
            <InputLabel>Total Paid</InputLabel>
            <Value>{totalPaidAmount}</Value>
          </Total>
        </div>
        <Chart>
          <ResponsiveContainer width='100%' minHeight={200} maxHeight={300}>
            <BarChart
              barGap={-30}
              barSize={30}
              barCategoryGap={50}
              data={g}
              margin={{ top: 15, right: 30, left: 20, bottom: 0 }}
              style={{ paddingTop: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' interval={400} height={40} hide />
              <YAxis />
              <Tooltip />

              <Bar dataKey='Open' fill='#82ca9d94'>
                <LabelList dataKey='name' position='bottom' angle={45} />
              </Bar>
              <Bar dataKey='Paid' fill='#82ca9d' />
              <Legend margin={margin} wrapperStyle={{ paddingTop: 20 }} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </DisplayFlex>
    </BoxUI>
  )
}

export default pure(InvoiceListStat)
