import * as stateNames from "constants/stateNames";
import createThunkReducer from "utils/createThunkReducer";
import * as actionTypes from "constants/actionTypes";

export default {
  [stateNames.OUTSOURCE_LIST]: createThunkReducer(actionTypes.OUTSOURCE_LIST),
  [stateNames.OUTSOURCE_CREATE]: createThunkReducer(actionTypes.OUTSOURCE_CREATE),
  [stateNames.OUTSOURCE_ITEM]: createThunkReducer(actionTypes.OUTSOURCE_ITEM),
  [stateNames.OUTSOURCE_UPDATE]: createThunkReducer(actionTypes.OUTSOURCE_UPDATE),
  [stateNames.OUTSOURCE_DELETE]: createThunkReducer(actionTypes.OUTSOURCE_DELETE),

}
