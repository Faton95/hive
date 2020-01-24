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
  GroupListContainer,
  GroupCreateContainer
} from './containers/GroupContainers'
import {
  PositionCreateContainer,
  PositionListContainer,
  PositionUpdateContainer
} from './containers/PositionContainer'

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
    path: ROUTES.GROUP_LIST_PATH,
    component: GroupListContainer
  },
  {
    exact: true,
    path: ROUTES.GROUP_CREATE_PATH,
    component: GroupCreateContainer
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
  }

]
