import * as ROUTES from '../../constants/routes'
import { ClientListContainer, ClientDetailContainer, ClientCreateContainer, ClientUpdateContainer } from './containers'

export default (store) => [
  {
    exact: true,
    path: ROUTES.CLIENT_LIST_PATH,
    component: ClientListContainer
  },
  {
    exact: true,
    path: ROUTES.CLIENT_ITEM_PATH,
    component: ClientDetailContainer
  },
  {
    exact: true,
    path: ROUTES.CLIENT_CREATE_PATH,
    component: ClientCreateContainer
  },
  {
    exact: true,
    path: ROUTES.CLIENT_UPDATE_PATH,
    component: ClientUpdateContainer
  },
]
