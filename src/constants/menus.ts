import * as ROUTES from '../constants/routes'

export const MENU_KEYS = {
  ORDER: 'order',
  ASSIGNMENT: 'assignment',
  CONTRACT: 'contract',
  REVIEW: 'review',
  OPERATIONS: 'operations',
  MANUFACTURING: 'manufacturing',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  BANK_ACCOUNT: 'bankAccount',
}

export default [
  {
    key: MENU_KEYS.ASSIGNMENT,
    title: 'Orders',
    url: ROUTES.ASSIGNMENT_LIST_PATH,
    children: [
      { title: 'Assignments', url: ROUTES.ASSIGNMENT_LIST_PATH },
      { title: 'Contract', url: ROUTES.CONTRACT_LIST_PATH },
    ]
  },
  {
    key: MENU_KEYS.CONTRACT,
    title: 'Contracts',
    url: ROUTES.CONTRACT_CREATE_PATH,
    children: [
    ]
  },
  {
    key: MENU_KEYS.SETTINGS,
    title: 'Settings',
    url: ROUTES.TAGS_LIST_PATH,
    children: [
      { title: 'Tags', url: ROUTES.TAGS_LIST_PATH },
      { title: 'Currency', url: ROUTES.CURRENCY_LIST_PATH },
      { title: 'Branch', url: ROUTES.BRANCH_LIST_PATH },
      { title: 'Groups', url: ROUTES.GROUP_LIST_PATH },
      { title: 'Position', url: ROUTES.POSITION_LIST_PATH },
      { title: 'Bank Account', url: ROUTES.BANK_ACCOUNT_LIST_PATH },
    ]
  }
]
