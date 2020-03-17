import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import InvoiceDetail from '../../components/Invoice/InvoiceDetail'
import { invoiceItemFetch, invoiceDeleteAction } from '../../action/invoice'
import { useFetchItem, useDelete } from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import { TInvoiceItem } from 'types'

type Props = {
    history: History;
    location: Location;
}
const InvoiceDetailContainer = (props: Props) => {
  const data = useFetchItem<TInvoiceItem>({
    action: invoiceItemFetch,
    stateName: stateNames.INVOICE_ITEM
  })

  const deleteData = useDelete({
    redirectUrl: ROUTES.INVOICE_LIST_PATH,
    action: invoiceDeleteAction,
    stateName: stateNames.INVOICE_DELETE
  })
  const onEdit = (id) => props.history.push(sprintf(ROUTES.INVOICE_UPDATE_URL, id))

  return (
    <InvoiceDetail
      data={data}
      onDelete={deleteData.onSubmit}
      onEdit={onEdit}
    />
  )
}
export default InvoiceDetailContainer
