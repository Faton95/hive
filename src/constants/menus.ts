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
    title: 'Заказы',
    url: ROUTES.ORDER_LIST_PATH,
    children: [
    ]
  },
  {
    key: MENU_KEYS.SETTINGS,
    title: 'Настройки',
    url: ROUTES.TAGS_LIST_PATH,
    children: [
      { title: 'Теги', url: ROUTES.TAGS_LIST_PATH }
    ]
  }
]
