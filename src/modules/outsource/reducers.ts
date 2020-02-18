import * as stateNames from "constants/stateNames";
import {createPostThunkReducer, createGetThunkReducer} from "utils/createThunkReducer";
import * as actionTypes from "constants/actionTypes";

export default {
  [stateNames.OUTSOURCE_LIST]: createGetThunkReducer(actionTypes.OUTSOURCE_LIST),
  [stateNames.OUTSOURCE_CREATE]: createPostThunkReducer(actionTypes.OUTSOURCE_CREATE),
  [stateNames.OUTSOURCE_ITEM]: createGetThunkReducer(actionTypes.OUTSOURCE_ITEM),
  [stateNames.OUTSOURCE_UPDATE]: createPostThunkReducer(actionTypes.OUTSOURCE_UPDATE),
  [stateNames.OUTSOURCE_DELETE]: createPostThunkReducer(actionTypes.OUTSOURCE_DELETE)
}
