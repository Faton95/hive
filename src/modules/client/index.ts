import * as ROUTES from '../../constants/routes'
import AsyncComponent from 'components/AsyncComponent'
import Layout from 'components/Layouts/Layout'

export const getClientListContainer = store =>
    import(/* webpackChunkName: "clients" */ './containers/ClientListContainer')
      .then(module => module.default)

export const getClientCreateContainer = store =>
    import(/* webpackChunkName: "clients" */ './containers/ClientCreateContainer')
      .then(module => module.default)

export const getClientDetailContainer = store =>
    import(/* webpackChunkName: "clients" */ './containers/ClientDetailContainer')
      .then(module => module.default)

export const getClientUpdateContainer = store =>
  import(/* webpackChunkName: "clients" */ './containers/ClientUpdateContainer')
    .then(module => module.default)

export default (store) => [
  {
    exact: true,
    path: ROUTES.CLIENT_LIST_PATH,
    layout: Layout,
    component: AsyncComponent(() => getClientListContainer(store))
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
