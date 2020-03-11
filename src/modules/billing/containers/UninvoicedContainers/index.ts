import { injectReducers } from 'etc/reducers'

export const getUninvoicedListContainer = store =>
  import(/* webpackChunkName: "uninvoiced" */ '../../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "uninvoiced" */ './UninvoicedListContainer'))
    .then(module => module.default)

export const getUninvoicedCreateContainer = store =>
  import(/* webpackChunkName: "uninvoiced" */ '../../reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "uninvoiced" */ './UninvoicedCreateContainer'))
    .then(module => module.default)
