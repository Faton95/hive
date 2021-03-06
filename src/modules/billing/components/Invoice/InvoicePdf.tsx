import React, { Fragment } from 'react'
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image
} from '@react-pdf/renderer'
import { path, pathOr, pipe, prop, reduce, map, sum } from 'ramda'
import { TInvoiceAssignmentItem, TInvoiceItem } from 'types'
import dateFormat from 'utils/dateFormat'
import Logo from 'images/logo.jpg'

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    alignItems: 'flex-start'
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    marginBottom: 15
  },
  invoiceNo: {
    fontSize: 12
  },
  invoiceId: {
    fontWeight: 'bold'
  },
  label: {
    paddingBottom: 10,
    fontSize: 12,
    color: 'grey',
    flex: 30
  },
  value: {
    flex: 70,
    paddingBottom: 10,
    fontSize: 12,
    paddingLeft: 10
  },
  info: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },

  tableWrap: {
    border: '1px solid #efef'
  },
  tableRow: {
    flexDirection: 'row',
    color: '#666',
    paddingTop: 4,
    borderBottom: '1pt solid #999'
  },
  tableHeaderRow: {
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 18,
    borderBottom: '1pt solid #000',
    paddingTop: 5
  },
  tableAssign: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 5
  },
  tableCol1: {
    flex: 1,
    paddingBottom: 5,
    fontSize: 12
  },
  tableCol1Right: {
    flex: 1,
    paddingBottom: 5,
    fontSize: 12,
    justifyContent: 'flex-end',
    textAlign: 'right'
  },
  tableColAss: {
    flex: 1,
    fontSize: 14,
    color: 'grey'
  },
  tableCol2: {
    flex: 5,
    fontSize: 14,
    fontWeight: 'thin'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  abs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fceeed'
  },
  note: {
    marginTop: 20,
    fontSize: 11,
    color: '#333',
    lineHeight: 1.2
  }
})

// Create Document Component
type Props = {
  data: TInvoiceItem;
};
const reduceAmount = (prev: number, curr: { amount: string }) =>
  prev + Number(curr.amount)

const mapFee = (ass: TInvoiceAssignmentItem) =>
  reduce(reduceAmount, 0, ass.fees)
const mapExpense = (ass: TInvoiceAssignmentItem) =>
  reduce(reduceAmount, 0, ass.expenses)
const InvoicePdf = (props: Props) => {
  const { data } = props
  const issueDate = prop('issueDate', data) || '2020-12-22'
  const dueDate = prop('dueDate', data) || '2020-12-22'
  const id = prop('id', data)
  const description = prop('description', data)
  const client = path(['client', 'name'], data)

  const assignmentList = pathOr<TInvoiceAssignmentItem[]>(
    [],
    ['assignments'],
    data
  )

  const totalFeeAmount = pipe(map(mapFee), sum)(assignmentList)
  const totalExpenseAmount = pipe(map(mapExpense), sum)(assignmentList)

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.abs} />
        <View style={styles.logoRow}>
          <Text>{client}</Text>
          <Image src={Logo} style={{ width: '30%' }} />
        </View>
        <View style={styles.logoRow}>
          <Text style={styles.title}>Invoice</Text>
          <View style={styles.invoiceNo}>
            <Text>Invoice No:</Text>
            <Text style={styles.invoiceId}>{id}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View>
            <Text style={styles.label}>Client</Text>
            <Text style={styles.label}>Invoice ID</Text>
            <Text style={styles.label}>Issue Date</Text>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.label}>Subject</Text>
          </View>
          <View>
            <Text style={styles.value}>{client}</Text>
            <Text style={styles.value}>{id}</Text>
            <Text style={styles.value}>{dateFormat(issueDate)}</Text>
            <Text style={styles.value}>{dateFormat(dueDate)}</Text>
            <Text style={styles.value}>{description}</Text>
          </View>
        </View>

        <View style={styles.tableWrap}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableCol2}>Assignment</Text>
            <Text style={styles.tableCol1}>Fee</Text>
            <Text style={styles.tableCol1Right}>Expense</Text>
          </View>
        </View>
        {assignmentList.map(assign => {
          const totalFee = reduce(reduceAmount, 0, assign.fees)
          const totalExpense = reduce(reduceAmount, 0, assign.expenses)
          return (
            <Fragment key={assign.id}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol2}>{assign.assignment.name}</Text>
                <Text style={styles.tableCol1}>{totalFee}</Text>
                <Text style={styles.tableCol1Right}>{totalExpense}</Text>
              </View>
            </Fragment>
          )
        })}
        <View style={styles.tableWrap}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableCol2}>Total</Text>
            <Text style={styles.tableCol1}>{totalFeeAmount}</Text>
            <Text style={styles.tableCol1Right}>{totalExpenseAmount}</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Please be advised that bank charges for the electronic transfer of
          money shall be responsibility of the Sender. Please give instruction
          to your bank to transfer total amount of
          {totalExpenseAmount + totalExpenseAmount} USD to our above bank
          account with the message All bank charges are responsibility of the
          Sender.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}

export default InvoicePdf
