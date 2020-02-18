import { injectReducers } from 'etc/reducers'
import * as ROUTES from '../../constants/routes'
import {
  OutsourceListContainer,
  OutsourceDetailContainer,
  OutsourceCreateContainer,
  OutsourceUpdateContainer
} from './containers'
import AsyncComponent from 'components/AsyncComponent'
import Layout from "components/Layouts/Layout";
const getOutSourceListContainer = store =>
  import(/* webpackChunkName: "outsource" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "outsource" */ './containers/OutsourceListContainer'))
    .then(module => module.default)


export default (store) => [
  {
    exact: true,
    path: ROUTES.OUTSOURCE_LIST_PATH,
    layout: Layout,
    component: AsyncComponent(() => getOutSourceListContainer(store))
  },
  {
    exact: true,
    path: ROUTES.OUTSOURCE_ITEM_PATH,
    component: OutsourceDetailContainer
  },
  {
    exact: true,
    path: ROUTES.OUTSOURCE_CREATE_PATH,
    component: OutsourceCreateContainer
  },
  {
    exact: true,
    path: ROUTES.OUTSOURCE_UPDATE_PATH,
    component: OutsourceUpdateContainer
  },
]
