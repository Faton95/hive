import * as ROUTES from '../../constants/routes'
import {
  AssignmentCreateContainer,
  AssignmentListContainer,
  AssignmentUpdateContainer,
  AssignmentDetailContainer
} from './containers/AssigmentContainers'

import {
  ContractCreateContainer,
  ContractListContainer,
  ContractDetailContainer,
  ContractUpdateContainer
} from './containers/ContractContainers'
import Layout from 'components/Layouts/Layout'

export default (store) => [
  {
    exact: true,
    path: ROUTES.ASSIGNMENT_LIST_PATH,
    component: AssignmentListContainer
  },
  {
    exact: true,
    path: ROUTES.ASSIGNMENT_CREATE_PATH,
    component: AssignmentCreateContainer
  },
  {
    exact: true,
    path: ROUTES.ASSIGNMENT_UPDATE_PATH,
    component: AssignmentUpdateContainer
  },
  {
    exact: true,
    path: ROUTES.ASSIGNMENT_ITEM_PATH,
    layout: Layout,
    component: AssignmentDetailContainer
  },
  {
    exact: true,
    path: ROUTES.CONTRACT_CREATE_PATH,
    component: ContractCreateContainer
  },
  {
    exact: true,
    path: ROUTES.CONTRACT_LIST_PATH,
    component: ContractListContainer
  },
  {
    exact: true,
    path: ROUTES.CONTRACT_ITEM_PATH,
    component: ContractDetailContainer
  },
  {
    exact: true,
    path: ROUTES.CONTRACT_UPDATE_PATH,
    component: ContractUpdateContainer
  }
]
