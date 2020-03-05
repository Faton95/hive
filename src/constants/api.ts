export const API_HOST = '62.109.28.223/'
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_PROTOCOL = 'http'
export const API_URL = `${API_PROTOCOL}://${API_HOST}`

const MAIN = 'main'
export const CHECK_TOKEN = '/main/check_token/'
export const LOGIN = `${MAIN}/login/`
export const FILE_UPLOAD = `${MAIN}/file/`
export const LOGOUT = `${MAIN}/logout/`

const CLIENT = `${MAIN}/client`
export const CLIENT_LIST = `/${CLIENT}/`
export const CLIENT_CREATE = `/${CLIENT}/`
export const CLIENT_ITEM = `/${CLIENT}/%d/`
export const CLIENT_DELETE = `/${CLIENT}/%d/`
export const CLIENT_UPDATE = `/${CLIENT}/%d/`

const OUTSOURCE = `${MAIN}/outsource`
export const OUTSOURCE_LIST = `/${OUTSOURCE}/`
export const OUTSOURCE_CREATE = `/${OUTSOURCE}/`
export const OUTSOURCE_ITEM = `/${OUTSOURCE}/%d/`
export const OUTSOURCE_DELETE = `/${OUTSOURCE}/%d/`
export const OUTSOURCE_UPDATE = `/${OUTSOURCE}/%d/`

const TIME_SHEET = `${MAIN}/time_sheet`
export const TIME_SHEET_LIST = `/${TIME_SHEET}/`
export const TIME_SHEET_CREATE = `/${TIME_SHEET}/`
export const TIME_SHEET_ITEM = `/${TIME_SHEET}/%d/`
export const TIME_SHEET_DELETE = `/${TIME_SHEET}/%d/`
export const TIME_SHEET_UPDATE = `/${TIME_SHEET}/%d/`
export const TIME_SHEET_CHANGE_STATUS = `/${TIME_SHEET}/%d/change_status/`


const ORDER = `${MAIN}/order`
export const ORDER_LIST = `/${ORDER}/`
export const ORDER_CREATE = `/${ORDER}/`
export const ORDER_ITEM = `/${ORDER}/%d/`
export const ORDER_DELETE = `/${ORDER}/%d/`
export const ORDER_UPDATE = `/${ORDER}/%d/`

const STAFF = `${MAIN}/staff`
export const STAFF_LIST = `/${STAFF}/`
export const STAFF_CREATE = `/${STAFF}/`
export const STAFF_ITEM = `/${STAFF}/%d/`
export const STAFF_DELETE = `/${STAFF}/%d/`
export const STAFF_UPDATE = `/${STAFF}/%d/`

const TAGS = `${MAIN}/tags`
export const TAGS_LIST = `/${TAGS}/`
export const TAGS_CREATE = `/${TAGS}/`
export const TAGS_ITEM = `/${TAGS}/%d/`
export const TAGS_DELETE = `/${TAGS}/%d/`
export const TAGS_UPDATE = `/${TAGS}/%d/`

const CURRENCY = `${MAIN}/currency`
export const CURRENCY_LIST = `/${CURRENCY}/`
export const CURRENCY_CREATE = `/${CURRENCY}/`
export const CURRENCY_ITEM = `/${CURRENCY}/%d/`
export const CURRENCY_DELETE = `/${CURRENCY}/%d/`
export const CURRENCY_UPDATE = `/${CURRENCY}/%d/`

const BRANCH = `${MAIN}/branch`
export const BRANCH_LIST = `/${BRANCH}/`
export const BRANCH_CREATE = `/${BRANCH}/`
export const BRANCH_ITEM = `/${BRANCH}/%d/`
export const BRANCH_DELETE = `/${BRANCH}/%d/`
export const BRANCH_UPDATE = `/${BRANCH}/%d/`

const DELIVERY_TYPE = `${MAIN}/delivery-type`
export const DELIVERY_TYPE_LIST = `/${DELIVERY_TYPE}/`
export const DELIVERY_TYPE_CREATE = `/${DELIVERY_TYPE}/`
export const DELIVERY_TYPE_ITEM = `/${DELIVERY_TYPE}/%d/`

const PRODUCT = `${MAIN}/product`
export const PRODUCT_LIST = `/${PRODUCT}/`
export const PRODUCT_ITEM = `/${PRODUCT}/%d/`

const PRODUCT_TYPE = `${MAIN}/product_type`
export const PRODUCT_TYPE_LIST = `/${PRODUCT_TYPE}/`
export const PRODUCT_TYPE_ITEM = `/${PRODUCT_TYPE}/%d/`

const GROUP = `${MAIN}/group`
export const GROUP_LIST = `/${GROUP}/`
export const GROUP_CREATE = `/${GROUP}/`
export const GROUP_ITEM = `/${GROUP}/%d/`
export const GROUP_DELETE = `/${GROUP}/%d/`
export const GROUP_UPDATE = `/${GROUP}/%d/`

const PERMISSION = `${MAIN}/permission`
export const PERMISSION_LIST = `/${PERMISSION}/`
export const PERMISSION_CREATE = `/${PERMISSION}/`
export const PERMISSION_ITEM = `/${PERMISSION}/%d/`
export const PERMISSION_DELETE = `/${PERMISSION}/%d/`
export const PERMISSION_UPDATE = `/${PERMISSION}/%d/`

const BANK_ACCOUNT = `${MAIN}/bank_account`
export const BANK_ACCOUNT_LIST = `/${BANK_ACCOUNT}/`
export const BANK_ACCOUNT_CREATE = `/${BANK_ACCOUNT}/`
export const BANK_ACCOUNT_ITEM = `/${BANK_ACCOUNT}/%d/`
export const BANK_ACCOUNT_DELETE = `/${BANK_ACCOUNT}/%d/`
export const BANK_ACCOUNT_UPDATE = `/${BANK_ACCOUNT}/%d/`

const CONTRACT = `${MAIN}/contract`
export const CONTRACT_LIST = `/${CONTRACT}/`
export const CONTRACT_CREATE = `/${CONTRACT}/`
export const CONTRACT_ITEM = `/${CONTRACT}/%d/`
export const CONTRACT_DELETE = `/${CONTRACT}/%d/`
export const CONTRACT_UPDATE = `/${CONTRACT}/%d/`

const ASSIGNMENT = `${MAIN}/assignment`
export const ASSIGNMENT_LIST = `/${ASSIGNMENT}/`
export const ASSIGNMENT_CREATE = `/${ASSIGNMENT}/`
export const ASSIGNMENT_ITEM = `/${ASSIGNMENT}/%d/`
export const ASSIGNMENT_DELETE = `/${ASSIGNMENT}/%d/`
export const ASSIGNMENT_UPDATE = `/${ASSIGNMENT}/%d/`

const POSITION = `${MAIN}/position`
export const POSITION_LIST = `/${POSITION}/`
export const POSITION_CREATE = `/${POSITION}/`
export const POSITION_ITEM = `/${POSITION}/%d/`
export const POSITION_DELETE = `/${POSITION}/%d/`
export const POSITION_UPDATE = `/${POSITION}/%d/`

const ROLE = `${MAIN}/role`
export const ROLE_LIST = `/${ROLE}/`
export const ROLE_CREATE = `/${ROLE}/`
export const ROLE_ITEM = `/${ROLE}/%d/`
export const ROLE_DELETE = `/${ROLE}/%d/`
export const ROLE_UPDATE = `/${ROLE}/%d/`

const FEE = `${MAIN}/fee`
export const FEE_LIST = `/${FEE}/`
export const FEE_CREATE = `/${FEE}/`
export const FEE_ITEM = `/${FEE}/%d/`
export const FEE_DELETE = `/${FEE}/%d/`
export const FEE_UPDATE = `/${FEE}/%d/`

const EXPENSE = `${MAIN}/expense`
export const EXPENSE_LIST = `/${EXPENSE}/`
export const EXPENSE_CREATE = `/${EXPENSE}/`
export const EXPENSE_ITEM = `/${EXPENSE}/%d/`
export const EXPENSE_DELETE = `/${EXPENSE}/%d/`
export const EXPENSE_UPDATE = `/${EXPENSE}/%d/`

const UNINVOICED = `${MAIN}/pre_invoice`
export const UNINVOICED_LIST = `/${UNINVOICED}/`
export const UNINVOICED_CREATE = `/${UNINVOICED}/`
export const UNINVOICED_ITEM = `/${UNINVOICED}/%d/`
export const UNINVOICED_DELETE = `/${UNINVOICED}/%d/`
export const UNINVOICED_UPDATE = `/${UNINVOICED}/%d/`

const INVOICE = `${MAIN}/invoice`
export const INVOICE_LIST = `/${INVOICE}/`
export const INVOICE_CREATE = `/${INVOICE}/`
export const INVOICE_ITEM = `/${INVOICE}/%d/`
export const INVOICE_DELETE = `/${INVOICE}/%d/`
export const INVOICE_UPDATE = `/${INVOICE}/%d/`
