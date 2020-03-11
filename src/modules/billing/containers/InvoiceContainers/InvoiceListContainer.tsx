import * as stateNames from 'constants/stateNames'
import React from 'react'
import { DEFAULT_PICK_PARAMS } from 'utils/isEquals'
import { useFetchList } from 'hooks'
import { TData } from 'types'
import { invoiceListFetch, invoiceMonthPaymentFetch, invoiceTotalPaymentFetch } from '../../action/invoice'
import InvoicedList from '../../components/Invoice/InvoicedList'

const PICK_PARAMS = [...DEFAULT_PICK_PARAMS, 'tags']
const PAGE_SIZE = 'page_size'

const InvoiceListContainer = props => {
  const invoiceData = useFetchList<TData<any>>({
    action: invoiceListFetch,
    stateName: stateNames.INVOICE_LIST,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 1000 })
  })

  const invoiceTotalData = useFetchList<TData<any>>({
    action: invoiceTotalPaymentFetch,
    stateName: stateNames.INVOICE_TOTAL_PAYMENT,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 1000 })
  })

  const invoiceMonthData = useFetchList<TData<any>>({
    action: invoiceMonthPaymentFetch,
    stateName: stateNames.INVOICE_MONTH_PAYMENT,
    pickParams: PICK_PARAMS,
    mapper: () => ({ [PAGE_SIZE]: 1000 })
  })


  return <InvoicedList invoiceData={invoiceData} />
}

export default InvoiceListContainer
