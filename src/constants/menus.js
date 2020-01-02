import * as ROUTES from '../constants/routes'

export const MENU_KEYS = {
  REVIEW: 'review',
  OPERATIONS: 'operations',
  MANUFACTURING: 'manufacturing',
  REPORTS: 'reports',
  SETTINGS: 'settings',
}

export default [
  {
    key: MENU_KEYS.REVIEW,
    title: 'Обзор',
    url: '',
    children: []
  },
  {
    key: MENU_KEYS.SETTINGS,
    title: 'Настройки',
    url: ROUTES.WORK_TIME_LIST_PATH,
    children: [
      { title: 'Продуктивность', url: '' },
      { title: 'Рабочее время', url: ROUTES.WORK_TIME_LIST_PATH },
      { title: 'Категории продуктов', url: '' },
      { title: 'Каталог цехов', url: '' },
    ]
  }
]
