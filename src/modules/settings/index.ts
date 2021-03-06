import * as ROUTES from 'constants/routes'
import {
  TagsListContainer,
  TagsCreateContainer,
  TagsUpdateContainer
} from './containers/Tags'
import {
  BranchListContainer,
  BranchCreateContainer,
  BranchUpdateContainer
} from './containers/Branch'
import {
  CurrencyListContainer,
  CurrencyCreateContainer,
  CurrencyUpdateContainer
} from './containers/Currency'
import {
  StaffCreateContainer,
  StaffListContainer,
  StaffUpdateContainer
} from './containers/StaffContainer'

import {
  GroupListContainer,
  GroupCreateContainer,
  GroupUpdateContainer
} from './containers/GroupContainers'
import {
  PositionCreateContainer,
  PositionListContainer,
  PositionUpdateContainer
} from './containers/PositionContainer'
import {
  RoleCreateContainer,
  RoleListContainer,
  RoleUpdateContainer
} from './containers/RoleContainer'
import {
  BankAccountCreateContainer,
  BankAccountListContainer,
  BankAccountUpdateContainer
} from './containers/BankAccountContainer'
import Layout from "components/Layouts/Layout";

export default (store) => [
  {
    exact: true,
    path: ROUTES.TAGS_LIST_PATH,
    component: TagsListContainer
  },
  {
    exact: true,
    path: ROUTES.TAGS_CREATE_PATH,
    component: TagsCreateContainer
  },
  {
    exact: true,
    path: ROUTES.TAGS_UPDATE_PATH,
    component: TagsUpdateContainer
  },
  {
    exact: true,
    path: ROUTES.BANK_ACCOUNT_LIST_PATH,
    component: BankAccountListContainer
  },
  {
    exact: true,
    path: ROUTES.BANK_ACCOUNT_CREATE_PATH,
    component: BankAccountCreateContainer
  },
  {
    exact: true,
    path: ROUTES.BANK_ACCOUNT_UPDATE_PATH,
    component: BankAccountUpdateContainer
  },

  {
    exact: true,
    path: ROUTES.BRANCH_LIST_PATH,
    component: BranchListContainer
  },
  {
    exact: true,
    path: ROUTES.BRANCH_CREATE_PATH,
    component: BranchCreateContainer
  },
  {
    exact: true,
    path: ROUTES.BRANCH_UPDATE_PATH,
    component: BranchUpdateContainer
  },

  {
    exact: true,
    path: ROUTES.CURRENCY_LIST_PATH,
    component: CurrencyListContainer
  },
  {
    exact: true,
    path: ROUTES.CURRENCY_CREATE_PATH,
    component: CurrencyCreateContainer
  },
  {
    exact: true,
    path: ROUTES.CURRENCY_UPDATE_PATH,
    component: CurrencyUpdateContainer
  },

  {
    exact: true,
    path: ROUTES.STAFF_LIST_PATH,
    component: StaffListContainer
  },
  {
    exact: true,
    path: ROUTES.STAFF_CREATE_PATH,
    component: StaffCreateContainer
  },
  {
    exact: true,
    path: ROUTES.STAFF_UPDATE_PATH,
    component: StaffUpdateContainer
  },

  {
    exact: true,
    path: ROUTES.GROUP_LIST_PATH,
    layout: Layout,
    component: GroupListContainer
  },
  {
    exact: true,
    path: ROUTES.GROUP_CREATE_PATH,
    layout: Layout,
    component: GroupCreateContainer
  },
  {
    exact: true,
    path: ROUTES.GROUP_UPDATE_PATH,
    layout: Layout,
    component: GroupUpdateContainer
  },

  {
    exact: true,
    path: ROUTES.POSITION_LIST_PATH,
    component: PositionListContainer
  },
  {
    exact: true,
    path: ROUTES.POSITION_CREATE_PATH,
    component: PositionCreateContainer
  },
  {
    exact: true,
    path: ROUTES.POSITION_UPDATE_PATH,
    component: PositionUpdateContainer
  },
  {
    exact: true,
    path: ROUTES.ROLE_LIST_PATH,
    component: RoleListContainer
  },
  {
    exact: true,
    path: ROUTES.ROLE_CREATE_PATH,
    component: RoleCreateContainer
  },
  {
    exact: true,
    path: ROUTES.ROLE_UPDATE_PATH,
    component: RoleUpdateContainer
  }

]
