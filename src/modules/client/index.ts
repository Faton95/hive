import * as ROUTES from '../../constants/routes'
import AsyncComponent from 'components/AsyncComponent'
import Layout from 'components/Layouts/Layout'
import { injectReducers } from 'etc/reducers'
import ClientListContainer from './containers/ClientListContainer'

export const getClientCreateContainer = store =>
  import(/* webpackChunkName: "clients" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "clients" */ './containers/ClientCreateContainer'))
    .then(module => module.default)

export const getClientDetailContainer = store =>
  import(/* webpackChunkName: "clients" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "clients" */ './containers/ClientDetailContainer'))
    .then(module => module.default)

export const getClientUpdateContainer = store =>
  import(/* webpackChunkName: "clients" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "clients" */ './containers/ClientUpdateContainer'))
    .then(module => module.default)

export default (store) => [
  {
    exact: true,
    path: ROUTES.CLIENT_LIST_PATH,
    layout: Layout,
    component: ClientListContainer
  },
  {
    exact: true,
    path: ROUTES.CLIENT_ITEM_PATH,
    layout: Layout,
    component: AsyncComponent(() => getClientDetailContainer(store))
  },
  {
    exact: true,
    path: ROUTES.CLIENT_CREATE_PATH,
    layout: Layout,
    component: AsyncComponent(() => getClientCreateContainer(store))
  },
  {
    exact: true,
    path: ROUTES.CLIENT_UPDATE_PATH,
    layout: Layout,
    component: AsyncComponent(() => getClientUpdateContainer(store))
  }
]
