import AsyncComponent from 'components/AsyncComponent'
import Layout from 'components/Layouts/Layout'
import * as ROUTES from '../../constants/routes'
import {
  getTimeSheetListContainer,
//  getOutSourceDetailContainer,
//  getOutSourceUpdateContainer,
//  getOutSourceCreateContainer
} from './containers'

import {
  getUninvoicedListContainer,
  getUninvoicedCreateContainer
} from './containers/UninvoicedContainers'

import {
  getInvoiceCreateContainer,
  getInvoiceListContainer
} from './containers/InvoiceContainers'

export default (store) => [
  {
    exact: true,
    path: ROUTES.TIME_SHEET_LIST_PATH,
    layout: Layout,
    component: AsyncComponent(() => getTimeSheetListContainer(store))
  },
  {
    exact: true,
    path: ROUTES.UNINVOICED_LIST_PATH,
    layout: Layout,
    component: AsyncComponent(() => getUninvoicedListContainer(store))
  },
  {
    exact: true,
    path: ROUTES.UNINVOICED_CREATE_PATH,
    layout: Layout,
    component: AsyncComponent(() => getUninvoicedCreateContainer(store))
  },
  {
    exact: true,
    path: ROUTES.INVOICE_CREATE_PATH,
    layout: Layout,
    component: AsyncComponent(() => getInvoiceCreateContainer(store))
  },
  {
    exact: true,
    path: ROUTES.INVOICE_LIST_PATH,
    layout: Layout,
    component: AsyncComponent(() => getInvoiceListContainer(store))
  },
/*  {
    exact: true,
    path: ROUTES.OUTSOURCE_ITEM_PATH,
    layout: Layout,
    component: AsyncComponent(() => getOutSourceDetailContainer(store))
  },
  {
    exact: true,
    path: ROUTES.OUTSOURCE_CREATE_PATH,
    layout: Layout,
    component: AsyncComponent(() => getOutSourceCreateContainer(store))
  },
  {
    exact: true,
    path: ROUTES.OUTSOURCE_UPDATE_PATH,
    layout: Layout,
    component: AsyncComponent(() => getOutSourceUpdateContainer(store))
  }, */
]
