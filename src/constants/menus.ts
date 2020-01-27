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
  CLIENT: 'client',
}

export default [
  {
    key: MENU_KEYS.ASSIGNMENT,
    title: 'Assignments',
    url: ROUTES.ASSIGNMENT_LIST_PATH,
    children: [
    ]
  },
  {
    key: MENU_KEYS.CLIENT,
    title: 'Client',
    url: ROUTES.CLIENT_LIST_PATH,
    children: [
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
      { title: 'Positions', url: ROUTES.GROUP_LIST_PATH },
    ]
  }
]
