import React, { Fragment } from 'react'
import { Page, Text, Document, StyleSheet, View, Image, Font } from '@react-pdf/renderer'
import { path, pathOr, pipe, prop, reduce, map, sum } from 'ramda'
import { TInvoiceAssignmentItem, TInvoiceItem } from 'types'
import dateFormat from 'utils/dateFormat'
import GothamProBold from 'fonts/GothamProBold.woff'
import GothamPro from 'fonts/GothamPro.woff'

Font.register({
  family: 'GothamPro',
  fonts: [
    {
      src: GothamPro
    },
    {
      src: GothamProBold,
      fontWeight: 'bold'
    }
  ]
})

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
    fontSize: 20,
    marginBottom: 15
  },
  invoiceNo: {
    fontSize: 12
  },
  invoiceId: {
    fontWeight: 'bold'
  },
  label: {
    paddingBottom: 2,
    fontSize: 12,
    color: 'grey'
  },
  value: {
    paddingBottom: 25,
    fontSize: 12
  },
  info: {
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
    flex: 15,
    paddingBottom: 5,
    fontSize: 12
  },
  tableCol1Right: {
    flex: 15,
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
    flex: 35,
    fontSize: 12,
    fontWeight: 'thin'
  },
  tableRowTotal: {
    flexDirection: 'row',
    paddingTop: 4,
    borderBottom: '1pt solid #999',
    fontWeight: 'bold',
    fontSize: 18

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
  },
  divider: {
    borderBottom: '2pt dashed #888',
    marginBottom: 30,
    paddingBottom: 30
  }
})

// Create Document Component
type Props = {
  data: TInvoiceItem
}
const FIRST = 0
const reduceAmount = (prev: number, curr: {amount: string}) => prev + Number(curr.amount)

const mapFee = (ass: TInvoiceAssignmentItem) => reduce(reduceAmount, 0, ass.fees)
const mapExpense = (ass: TInvoiceAssignmentItem) => reduce(reduceAmount, 0, ass.expenses)
const InvoicePdf = (props: Props) => {
  const { data } = props
  const issueDate = prop('issueDate', data) || '2020-12-22'
  const dueDate = prop('dueDate', data) || '2020-12-22'
  const id = prop('id', data)
  const description = prop('description', data)
  const client = path(['client', 'name'], data)

  const assignmentList = pathOr<TInvoiceAssignmentItem[]>([], ['assignments'], data)

  const totalFeeAmount = pipe(map(mapFee), sum)(assignmentList)
  const totalExpenseAmount = pipe(map(mapExpense), sum)(assignmentList)

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.abs} />
        <View style={styles.logoRow}>
          <View style={styles.invoiceNo}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceId}>{id}</Text>
          </View>
          <Text style={styles.invoiceNo}>{dateFormat(issueDate)}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{client}</Text>
        </View>

        {assignmentList.map((assign, index) => {
          const totalFee = reduce(reduceAmount, 0, assign.fees)
          return (
            <Fragment key={assign.id}>
              {index !== FIRST && <View style={styles.divider} />}

              <View>
                <Text style={styles.label}>Assignment</Text>
                <Text style={styles.value}>{assign.assignment.name}</Text>
              </View>
              <Text style={styles.title}>Time Sheet</Text>
              <View style={styles.tableWrap}>
                <View style={styles.tableHeaderRow}>
                  <Text style={styles.tableCol1}>Lawyer</Text>
                  <Text style={styles.tableCol1}>Date</Text>
                  <Text style={styles.tableCol2}>Description</Text>
                  <Text style={styles.tableCol1}>Hours</Text>
                  <Text style={styles.tableCol1Right}>Price</Text>
                </View>
              </View>

              {assign.fees.map(fee => (
                <View style={styles.tableRow} key={fee.id}>
                  <Text style={styles.tableCol1}>{fee.user.fullName}</Text>
                  <Text style={styles.tableCol1}>{fee.date}</Text>
                  <Text style={styles.tableCol2}>{fee.description}</Text>
                  <Text style={styles.tableCol1}>{fee.spentTime}</Text>
                  <Text style={styles.tableCol1Right}>{fee.amount}</Text>
                </View>
              ))}

              <View style={styles.tableRowTotal}>
                <Text style={styles.tableCol2}>Total</Text>
                <Text style={styles.tableCol1Right}>{totalFee}</Text>
              </View>
            </Fragment>
          )
        })}
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
