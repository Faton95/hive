import * as stateNames from 'constants/stateNames'

import { INVOICE_LIST_PATH } from 'constants/routes'
import { useCreate, useFetchItem, useUpdate } from 'hooks'
import React from 'react'
import { TInvoiceItem } from 'types'
import { useParams } from 'react-router-dom'
import toSnakeCase from 'utils/toSnakeCase'
import { invoiceItemFetch, invoiceUpdateAction } from '../../action/invoice'
import InvoiceUpdate from '../../components/Invoice/InvoiceUpdate'
import { path } from 'ramda'

const serializer = (values, data: TInvoiceItem) => {
  const client = data.client.id
  const assignments = data.assignments.map(ass => ({
    assignment: ass.assignment.id,
    fees: ass.fees.map(fee => fee.id),
    expenses: ass.expenses.map(fee => fee.id)
  }))
  return toSnakeCase({
    client,
    assignments,
    ...values
  })
}
const InvoiceUpdateContainer = props => {
  const { id } = useParams<{id: string}>()
  const invoiceData = useFetchItem<TInvoiceItem>({
    action: invoiceItemFetch,
    stateName: stateNames.INVOICE_ITEM
  })

  const initialValues = {
    description: path(['data', 'description'], invoiceData),
    dueDate: path(['data', 'dueDate'], invoiceData),
    issueDate: path(['data', 'issueDate'], invoiceData)
  }
  const data = useUpdate<TInvoiceItem>({
    initialValues,
    stateName: stateNames.INVOICE_UPDATE,
    action: invoiceUpdateAction,
    serializer: (values) => serializer(values, invoiceData.data),
    redirectUrl: INVOICE_LIST_PATH
  })
  return (
    <InvoiceUpdate
      invoiceData={invoiceData}
      updateData={data}
    />
  )
}

export default InvoiceUpdateContainer
