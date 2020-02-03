import * as ROUTES from '../../constants/routes'
import {
  OrderListContainer,
  OrderDetailContainer,
  OrderCreateContainer,
  OrderUpdateContainer
} from './containers'
import {
  AssignmentCreateContainer
} from './containers/AssigmentContainers'

import {
  ContractCreateContainer
} from './containers/ContractContainers'

export default (store) => [
  {
    exact: true,
    path: ROUTES.ORDER_LIST_PATH,
    component: OrderListContainer
  },
  {
    exact: true,
    path: ROUTES.ORDER_ITEM_PATH,
    component: OrderDetailContainer
  },
  {
    exact: true,
    path: ROUTES.ORDER_CREATE_PATH,
    component: OrderCreateContainer
  },
  {
    exact: true,
    path: ROUTES.ORDER_UPDATE_PATH,
    component: OrderUpdateContainer
  },

  {
    exact: true,
    path: ROUTES.ASSIGNMENT_LIST_PATH,
    component: AssignmentCreateContainer
  },

  {
    exact: true,
    path: ROUTES.CONTRACT_CREATE_PATH,
    component: ContractCreateContainer
  },
]
