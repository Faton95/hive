import * as ROUTES from '../constants/routes'

export const MENU_KEYS = {
  ORDER: 'order',
  REVIEW: 'review',
  OPERATIONS: 'operations',
  MANUFACTURING: 'manufacturing',
  REPORTS: 'reports',
  SETTINGS: 'settings',
}

export default [
  {
    key: MENU_KEYS.ORDER,
    title: 'Orders',
    url: ROUTES.ORDER_LIST_PATH,
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
