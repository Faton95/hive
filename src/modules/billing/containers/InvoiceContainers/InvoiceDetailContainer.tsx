import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import InvoiceDetail from '../../components/Invoice/InvoiceDetail'
import { uninvoicedItemFetch } from '../../action/invoice'
import { useFetchItem } from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'

type Props = {
    history: History;
    location: Location;
}
const InvoiceDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: uninvoicedItemFetch,
    stateName: stateNames.INVOICE_ITEM
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.INVOICE, id))

  return (
      <InvoiceDetail
        data={data}
        onDelete={() => null}
        onEdit={onEdit}
      />
  )
}
export default InvoiceDetailContainer
