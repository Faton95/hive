import * as stateNames from 'constants/stateNames'

import { useCreate, useFetchItem } from 'hooks'
import React from 'react'
import { TPreInvoiceItem } from 'types'

import { useParams } from 'react-router-dom'
import { uninvoicedCreateAction } from '../../action/billing'
import { preInvoiceItemFetch } from '../../action/preInvoice'
import InvoicedCreate from '../../components/Invoice/InvoicedCreate'

const UninvoicedCreateContainer = props => {
  const { id } = useParams<{id: string}>()
  const preInvoiceData = useFetchItem<TPreInvoiceItem>({
    action: preInvoiceItemFetch,
    stateName: stateNames.UNINVOICED_ITEM
  })

  const data = useCreate({
    stateName: stateNames.UNINVOICED_CREATE,
    action: uninvoicedCreateAction,
    onSuccess: data => console.warn(data)
  })
  return (
    <InvoicedCreate
      preInvoiceData={preInvoiceData}
      createData={data}
      onSubmit={() => null}
    />
  )
}

export default UninvoicedCreateContainer
