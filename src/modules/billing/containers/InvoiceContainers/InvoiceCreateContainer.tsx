import * as stateNames from 'constants/stateNames'

import { INVOICE_LIST_PATH } from 'constants/routes'
import { useCreate, useFetchItem } from 'hooks'
import React from 'react'
import { TPreInvoiceItem } from 'types'
import { useParams } from 'react-router-dom'
import toSnakeCase from 'utils/toSnakeCase'
import { invoiceCreateAction } from '../../action/invoice'
import { preInvoiceItemFetch } from '../../action/preInvoice'
import InvoicedCreate from '../../components/Invoice/InvoicedCreate'

const serializer = (values, data: TPreInvoiceItem) => {
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
const InvoicedCreateContainer = props => {
  const { id } = useParams<{id: string}>()
  const preInvoiceData = useFetchItem<TPreInvoiceItem>({
    action: preInvoiceItemFetch,
    stateName: stateNames.UNINVOICED_ITEM
  })

  const data = useCreate({
    stateName: stateNames.INVOICE_CREATE,
    action: invoiceCreateAction,
    serializer: (values) => serializer(values, preInvoiceData.data),
    redirectUrl: INVOICE_LIST_PATH
  })
  return (
    <InvoicedCreate
      preInvoiceData={preInvoiceData}
      createData={data}
      onSubmit={() => null}
    />
  )
}

export default InvoicedCreateContainer
