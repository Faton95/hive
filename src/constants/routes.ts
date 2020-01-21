export const ROOT = ''
export const ROOT_PATH = `/${ROOT}`

const ID = ':id(\\d+)'

export const ORDER = 'order'
export const ORDER_LIST_PATH = `/${ORDER}`
export const ORDER_CREATE_PATH = `/${ORDER}/create`
export const ORDER_ITEM_PATH = `/${ORDER}/${ID}`
export const ORDER_ITEM_URL = `/${ORDER}/%d`

export const ORDER_UPDATE_PATH = `/${ORDER}/${ID}/update`
export const ORDER_UPDATE_URL = `/${ORDER}/%d/update`

export const TAGS = 'tags'
export const TAGS_LIST_PATH = `/${TAGS}`
export const TAGS_CREATE_PATH = `/${TAGS}/create`
export const TAGS_ITEM_PATH = `/${TAGS}/${ID}`
export const TAGS_ITEM_URL = `/${TAGS}/%d`
export const TAGS_UPDATE_PATH = `/${TAGS}/${ID}/update`
export const TAGS_UPDATE_URL = `/${TAGS}/%d/update`
