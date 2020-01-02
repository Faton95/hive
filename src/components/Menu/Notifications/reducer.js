import { NOTIFY_LIST } from './actions'
import createReducer from '~/utils/createReducer'

const defaultState = {
  data: []
}

export default createReducer(defaultState, {
  [`${NOTIFY_LIST}`] (state, { payload }) {
    return {
      ...state,
      ...payload
    }
  }
})
