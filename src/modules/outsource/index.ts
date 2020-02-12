import * as ROUTES from '../../constants/routes'
import {
  OutsourceListContainer,
  OutsourceDetailContainer,
  OutsourceCreateContainer,
  OutsourceUpdateContainer
} from './containers'

export default (store) => [
  {
    exact: true,
    path: ROUTES.OUTSOURCE_LIST_PATH,
    component: OutsourceListContainer
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
