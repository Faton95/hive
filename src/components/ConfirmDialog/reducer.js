import createReducer from '../../utils/createReducer'
import * as actions from './actions'

export const defaultState = {
  open: false,
  loading: false,
  title: 'Подтверждение удаления',
  message: 'Вы уверены, что хотите удалить этот элемент?',
  onConfirm: () => null
}

export default createReducer(defaultState, {
  [`${actions.CONFIRM_DIALOG_OPEN}`] (state, { payload }) {
    return {
      ...state,
      ...payload,
      open: true
    }
  },

  [`${actions.CONFIRM_DIALOG_CLOSE}`] () {
    return {
      ...defaultState,
      open: false
    }
  }
})
