import { injectReducers } from 'etc/reducers'

export const getInvoiceListContainer = store =>
  import(/* webpackChunkName: "uninvoiced" */ '../../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "uninvoiced" */ './InvoiceListContainer'))
    .then(module => module.default)

export const getInvoiceCreateContainer = store =>
  import(/* webpackChunkName: "uninvoiced" */ '../../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "uninvoiced" */ './InvoiceCreateContainer'))
    .then(module => module.default)

export const getInvoiceDetailsContainer = store =>
  import(/* webpackChunkName: "uninvoiced" */ '../../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "uninvoiced" */ './InvoiceDetailContainer'))
    .then(module => module.default)

export const getInvoiceUpdateContainer = store =>
  import(/* webpackChunkName: "uninvoiced" */ '../../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "uninvoiced" */ './InvoiceUpdateContainer'))
    .then(module => module.default)
