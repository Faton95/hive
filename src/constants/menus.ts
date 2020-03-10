import * as ROUTES from '../constants/routes'
import * as PERMS from '../constants/permissions'

export const MENU_KEYS = {
  ORDER: 'order',
  ASSIGNMENT: 'assignment',
  BILLING: 'assignmentpreinvoice',
  CONTRACT: 'contract',
  REVIEW: 'review',
  OPERATIONS: 'operations',
  MANUFACTURING: 'manufacturing',
  REPORTS: 'reports',
  SETTINGS: 'tags',
  BANK_ACCOUNT: 'bankAccount',
  CLIENT: 'client',
  STAFF: 'staff',
  OUTSOURCE: 'outsource',
  TIME_SHEET: 'timesheet'
}

export default [
  {
    key: MENU_KEYS.ASSIGNMENT,
    title: 'Assignment',
    url: ROUTES.ASSIGNMENT_LIST_PATH,
    perms: PERMS.ASSIGNMENT,
    children: [
    ]
  },
  {
    key: MENU_KEYS.CONTRACT,
    title: 'Contract',
    url: ROUTES.CONTRACT_LIST_PATH,
    children: [
      {
        title: 'Contract',
        url: ROUTES.CONTRACT_LIST_PATH,
        key: MENU_KEYS.CONTRACT
      },
      {
        title: 'Time and Materials',
        url: ROUTES.TIME_SHEET_LIST_PATH,
        key: MENU_KEYS.TIME_SHEET
      },

    ]
  },
  {
    key: MENU_KEYS.BILLING,
    title: 'Billing',
    url: ROUTES.UNINVOICED_LIST_PATH,
    children: [
      {
        title: 'Invoices',
        url: ROUTES.INVOICE_LIST_PATH,
        key: MENU_KEYS.BILLING
      },
      {
        title: 'Uninvoiced',
        url: ROUTES.UNINVOICED_LIST_PATH,
        key: MENU_KEYS.BILLING
      }
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
    key: MENU_KEYS.OUTSOURCE,
    title: 'Outsource',
    url: ROUTES.OUTSOURCE_LIST_PATH,
    children: [
    ]
  },
  // {
  //   key: MENU_KEYS.CONTRACT,
  //   title: 'Contracts',
  //   url: ROUTES.CONTRACT_LIST_PATH,
  //   children: [
  //   ]
  // },
  {
    key: MENU_KEYS.SETTINGS,
    title: 'Settings',
    url: ROUTES.TAGS_LIST_PATH,
    children: [
      { title: 'Tags', url: ROUTES.TAGS_LIST_PATH },
      { title: 'Currency', url: ROUTES.CURRENCY_LIST_PATH },
      { title: 'Branch', url: ROUTES.BRANCH_LIST_PATH },
      { title: 'Groups', url: ROUTES.GROUP_LIST_PATH },
      { title: 'Role', url: ROUTES.ROLE_LIST_PATH },
      { title: 'Staff', url: ROUTES.STAFF_LIST_PATH },
      { title: 'Position', url: ROUTES.POSITION_LIST_PATH },
      { title: 'Bank Account', url: ROUTES.BANK_ACCOUNT_LIST_PATH },
    ]
  }
]
