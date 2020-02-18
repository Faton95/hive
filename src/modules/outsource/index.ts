import * as ROUTES from '../../constants/routes'
import {
  getOutSourceListContainer,
  getOutSourceDetailContainer,
  getOutSourceUpdateContainer,
  getOutSourceCreateContainer
} from './containers'
import AsyncComponent from 'components/AsyncComponent'
import Layout from "components/Layouts/Layout";


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
  },
]
