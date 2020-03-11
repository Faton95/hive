import * as stateNames from 'constants/stateNames'
import createThunkReducer from 'utils/createThunkReducer'
import * as actionTypes from 'constants/actionTypes'

export default {
  [stateNames.CLIENT_CREATE]: createThunkReducer(actionTypes.CLIENT_CREATE),
  [stateNames.CLIENT_ITEM]: createThunkReducer(actionTypes.CLIENT_ITEM),
  [stateNames.CLIENT_UPDATE]: createThunkReducer(actionTypes.CLIENT_UPDATE),
  [stateNames.CLIENT_DELETE]: createThunkReducer(actionTypes.CLIENT_DELETE)
}
