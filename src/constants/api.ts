export const API_HOST = '62.109.28.223/'
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_PROTOCOL = 'http'
export const API_URL = `${API_PROTOCOL}://${API_HOST}`

const MAIN = 'main'
export const CHECK_TOKEN = '/main/client/check_token/'
export const LOGIN = `${MAIN}/login/`
export const LOGOUT = `${MAIN}/logout/`

const CLIENT = `${MAIN}/client`
export const CLIENT_LIST = `/${CLIENT}/`
export const CLIENT_ITEM = `/${CLIENT}/%d/`

const ORDER = `${MAIN}/order`
export const ORDER_LIST = `/${ORDER}/`
export const ORDER_CREATE = `/${ORDER}/`
export const ORDER_ITEM = `/${ORDER}/%d/`
export const ORDER_DELETE = `/${ORDER}/%d/`
export const ORDER_UPDATE = `/${ORDER}/%d/`

const TAGS = `${MAIN}/tags`
export const TAGS_LIST = `/${TAGS}/`
export const TAGS_CREATE = `/${TAGS}/`
export const TAGS_ITEM = `/${TAGS}/%d/`
export const TAGS_DELETE = `/${TAGS}/%d/`
export const TAGS_UPDATE = `/${TAGS}/%d/`

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
