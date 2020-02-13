import { sprintf } from 'sprintf-js'
import { API_URL, FILE_UPLOAD_ITEM } from '~/constants/api'

export const getFileUrl = (fileId, accessToken) => {
  const STORE_FILE_ITEM_URL = sprintf(FILE_UPLOAD_ITEM, fileId)
  return fileId ? `${API_URL}${STORE_FILE_ITEM_URL}?token=${accessToken}` : null
}
