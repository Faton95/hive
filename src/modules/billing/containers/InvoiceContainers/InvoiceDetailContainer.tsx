import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import InvoiceDetail from '../../components/Invoice/InvoiceDetail'
import { invoiceItemFetch } from '../../action/invoice'
import { useFetchItem } from 'hooks'
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

  const onEdit = (id) => props.history.push(sprintf(ROUTES.INVOICE_UPDATE_URL, id))

  return (
    <InvoiceDetail
      data={data}
      onDelete={() => null}
      onEdit={onEdit}
    />
  )
}
export default InvoiceDetailContainer
