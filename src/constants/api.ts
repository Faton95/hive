export const API_HOST = '94.250.255.250:8081/'
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_PROTOCOL = 'http'
export const API_URL = `${API_PROTOCOL}://${API_HOST}`

const MAIN = 'main'
export const CHECK_TOKEN = '/main/client/check_token/'
export const LOGIN = `${MAIN}/login/`
export const LOGOUT = `${MAIN}/logout/`

const ORDER = `${MAIN}/order`
export const ORDER_LIST = `/${ORDER}/`
export const ORDER_ITEM = `/${ORDER}/%d/`
