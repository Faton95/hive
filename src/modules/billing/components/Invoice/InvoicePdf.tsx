import React, { Fragment } from 'react'
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer'
import {path, pathOr, prop, propOr} from 'ramda'
import { Col } from 'components/UI/Grid'
import {PreInvoiceAssignmentItem} from "types";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    marginBottom: 15
  },
  label: {
    paddingBottom: 10,
    fontSize: 12,
    color: 'grey',
    flexGrow: 30
  },
  value: {
    flexGrow: 70,
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
    flexDirection: 'row'
  },
  tableCol1: {
    flexGrow: 1
  },
  tableCol2: {
    flexGrow: 2
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  }
})

// Create Document Component
const InvoicePdf = props => {
  const { data } = props
  const issueDate = prop('issueDate', data) || '2020-12-22'
  const dueDate = prop('dueDate', data) || '2020-12-22'
  const id = prop('id', data)
  const description = prop('description', data)
  const client = path(['client', 'name'], data)

  const assignmentList = pathOr<PreInvoiceAssignmentItem[]>([], ['assignments'], data)

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Invoice</Text>
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
            <Text style={styles.value}>{issueDate}</Text>
            <Text style={styles.value}>{dueDate}</Text>
            <Text style={styles.value}>{description}</Text>
          </View>
        </View>

        <View style={styles.tableWrap}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol1}>dasdas</Text>
            <Text style={styles.tableCol2}>dasdas</Text>
            <Text style={styles.tableCol1}>dasdas</Text>
          </View>
        </View>
        {assignmentList.map(assign => {
          console.warn(assign)
          return (
            <Fragment key={assign.id}>
              <View style={styles.tableRow} key={assign.id}>
                <View style={styles.tableCol1}>
                  <Text>
                    {assign.assignment.name}
                  </Text>
                </View>
              </View>
              {/*{assign.fees.map(fee => (
                <View style={styles.tableRow} key={fee.id}>
                  <Col span={12}>
                    {fee.description}
                  </Col>
                  <Col span={8}>{fee.amount}</Col>
                  <Col span={6}>{fee.date}</Col>
                </View>
              ))}
              {assign.expenses.map(exp => (
                <View style={styles.tableRow} key={exp.id}>
                  <View style={styles.tableCol1}>
                    {exp.description}
                  </View>
                  <View style={styles.tableCol1}>{exp.amount}</View>
                  <View style={styles.tableCol1}>{exp.date}</View>
                </View>
              ))}*/}
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
