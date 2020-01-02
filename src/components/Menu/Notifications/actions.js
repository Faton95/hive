export const NOTIFY_LIST = 'NOTIFY_LIST'

export const notifyListAtion = payload => {
  return {
    type: NOTIFY_LIST,
    payload: { data: payload }
  }
}
